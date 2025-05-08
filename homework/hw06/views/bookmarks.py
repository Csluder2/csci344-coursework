import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post  # Assumed location; needed for post lookup
from views import get_authorized_user_ids
import flask_jwt_extended  # Assumed location

# Handles listing and creating bookmarks
class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required() 
    def get(self):
        # Fetch bookmarks that belong to the current user
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id)

        # Convert each bookmark to a dictionary for JSON serialization
        data = [item.to_dict() for item in bookmarks.all()]

        # Return the data with a 200 OK status
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )

    @flask_jwt_extended.jwt_required() 
    def post(self):
        # Parse the incoming JSON request body
        request_data = request.get_json()

        post_id = request_data.get('post_id')

        # Validate that post_id is provided
        if post_id is None:
            return Response(
                json.dumps({"message": "post_id is a required field"}),
                mimetype="application/json",
                status=400,
            )

        # Ensure post_id is an integer
        try:
            post_id = int(post_id)
        except Exception:
            return Response(
                json.dumps({"message": "post_id must be an integer"}),
                mimetype="application/json",
                status=400,
            )

        # Check if the post exists
        post = Post.query.get(post_id)
        if post is None:
            return Response(
                json.dumps({"message": f"post id={post_id} not found"}),
                mimetype="application/json",
                status=404,
            )

        # Verify the user has access to bookmark this post
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)

        if post.user_id not in ids_for_me_and_my_friends:
            return Response(
                json.dumps({"message": "you are not authorized to bookmark this post"}),
                mimetype="application/json",
                status=404,
            )

        # Prevent duplicate bookmarks
        bookmark = Bookmark.query.filter(
            Bookmark.post_id == post_id, Bookmark.user_id == self.current_user.id
        ).first()

        if bookmark is not None:
            return Response(
                json.dumps({"message": "post already bookmarked"}),
                mimetype="application/json",
                status=400,
            )

        # Create and save the new bookmark
        new_bookmark = Bookmark(
            post_id=post_id,
            user_id=self.current_user.id,
        )

        db.session.add(new_bookmark)
        db.session.commit()

        # Return the new bookmark with a 201 Created status
        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


# Handles deleting a single bookmark by ID
class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required() 
    def delete(self, id):
        # Lookup the bookmark by ID
        bookmark = Bookmark.query.filter_by(id=id, user_id=self.current_user.id).first()

        # Return 404 if not found
        if bookmark is None:
            return Response(
                json.dumps({"message": f"bookmark id={id} not found"}),
                mimetype="application/json",
                status=404,
            )
            

        # Delete the bookmark and commit the transaction
        db.session.delete(bookmark)
        db.session.commit()

        # Confirm deletion
        return Response(
            json.dumps({"message": f"bookmark id={id} deleted"}),
            mimetype="application/json",
            status=200,
        )



def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
