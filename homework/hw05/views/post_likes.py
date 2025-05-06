import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from views import get_authorized_user_ids
from models.post import Post


class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        # Store the current authenticated user
        self.current_user = current_user

    def post(self):
        # Handles creating a new like for a post

        request_data = request.get_json()  
        post_id = request_data.get("post_id")  

        # Validate that post_id is provided
        if post_id is None:
            return Response(
                json.dumps({"message": "post_id is a required field"}),
                mimetype="application/json",
                status=400
            )
        
        # Validate that post_id is an integer
        try:
            post_id = int(post_id)
        except Exception as e:
            return Response(
                json.dumps({"message": "post_id must be an integer"}),
                mimetype="application/json",
                status=400
            )

        # Check that the post with post_id exists
        post = Post.query.get(post_id)
        if post is None:
            return Response(
                json.dumps({"message": f"post id={post_id} not found"}),
                mimetype="application/json",
                status=404,
            )

        # Get list of authorized user IDs (self and friends)
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)

        # Check if the user is authorized to like the post
        if post.user_id not in ids_for_me_and_my_friends:
            return Response(
                json.dumps({"message": "you are not authorized to like this post"}),
                mimetype="application/json",
                status=404,
            )

        # Check if this post is already liked by the current user
        like = LikePost.query.filter(
            LikePost.post_id == post_id, 
            LikePost.user_id == self.current_user.id
        ).first()
        
        if like is not None:
            return Response(
                json.dumps({"message": "post already liked"}),
                mimetype="application/json",
                status=400,
            )

        # Create a new LikePost record
        new_like = LikePost(
            post_id=post_id,
            user_id=self.current_user.id,
        )

        # Persist the new like in the database
        db.session.add(new_like)
        db.session.commit()

        # Return the newly created like
        return Response(
            json.dumps(new_like.to_dict()),
            mimetype="application/json",
            status=201,
        )


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        # Store the current authenticated user
        self.current_user = current_user

    def delete(self, id):
        # Handles deleting a like by its ID

        like = LikePost.query.filter_by(id=id, user_id=self.current_user.id).first()
        if like is None:
            return Response(
            json.dumps({"message": f"like id={id} not found or not authorized"}),
            mimetype="application/json",
            status=404,
         )
        # Delete the like from the database
        db.session.delete(like)
        db.session.commit()

        # Confirm deletion
        return Response(
            json.dumps({"message": f"like id={id} deleted"}),
            mimetype="application/json",
            status=200,
        )



def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )

