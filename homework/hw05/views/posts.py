import json
from flask import Response, request
from flask_restful import Resource
from models import db
from models.post import Post
from views import get_authorized_user_ids

def get_path():
    return request.host_url + "api/posts/"

class PostListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # Get the optional 'limit' query param from the URL
        limit = request.args.get("limit", default=20, type=int)

        # Validate the limit value
        if limit > 50:
            return Response(
                json.dumps({"message": "limit has to be less than or equal to 50 posts"}),
                mimetype="application/json",
                status=400
            )

        # Get user IDs for current user and their friends
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)

        # Query posts from authorized users, limited by the limit param
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(limit).all()

        # Serialize posts to dict
        data = [post.to_dict(user=self.current_user) for post in posts]

        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        data = request.json

        # Required field: image_url
        image_url = data.get("image_url")
        if image_url is None:
            return Response(
                json.dumps({"message": "image_url is required"}),
                mimetype="application/json",
                status=400
            )

        # Optional fields
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        # Create new post
        post = Post(
            image_url=image_url,
            user_id=self.current_user.id,
            caption=caption,
            alt_text=alt_text,
        )

        db.session.add(post)
        db.session.commit()

        return Response(json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=201)

class PostDetailEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    def get(self, id):
        post = Post.query.get(id)

        if post is None:
            return Response(
                json.dumps({"message": "post not found"}),
                mimetype="application/json",
                status=404
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "you are not authorized to get this post"}),
                mimetype="application/json",
                status=403  # 403 is more appropriate for unauthorized access
            )

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

    def patch(self, id):
        data = request.json
        post = Post.query.get(id)

        if post is None:
            return Response(
                json.dumps({"message": "post not found"}),
                mimetype="application/json",
                status=404
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Proper authorization not given to edit this"}),
                mimetype="application/json",
                status=403
            )

        # Update fields only if present in the request
        if data.get("image_url") is not None:
            post.image_url = data.get("image_url")

        if data.get("alt_text") is not None:
            post.alt_text = data.get("alt_text")

        if data.get("caption") is not None:
            post.caption = data.get("caption")

        db.session.commit()

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

    def delete(self, id):
        post = Post.query.get(id)

        if post is None:
            return Response(
                json.dumps({"message": f"post id={id} not found"}),
                mimetype="application/json",
                status=404
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": f"you are not authorized to delete post id={id}"}),
                mimetype="application/json",
                status=403
            )

        db.session.delete(post)
        db.session.commit()

        return Response(
            json.dumps({"message": f"post id={id} deleted"}),
            mimetype="application/json",
            status=200
        )

# Register the API routes
def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )

 
        
