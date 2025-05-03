import json
from flask import Response
from flask_restful import Resource

from models.story import Story
from views import get_authorized_user_ids

class StoriesListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # Get user IDs for the current user and their friends
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)

        # Query stories from those users
        stories = Story.query.filter(Story.user_id.in_(ids_for_me_and_my_friends)).all()

        # Serialize each story to a dictionary
        data = [story.to_dict() for story in stories]

        # Return the JSON response
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200
        )

# Register the endpoint with the API
def initialize_routes(api, current_user):
    api.add_resource(
        StoriesListEndpoint,
        "/api/stories",
        "/api/stories/",
        resource_class_kwargs={"current_user": current_user},
    )
