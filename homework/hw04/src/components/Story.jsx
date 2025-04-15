import React from "react";

export default function Story({ story }) {

    return (
        <div className="flex flex-col justify-center items-center">
            <img src={story.user.thumb_url} alt={story.user.thumb_url} className="rounded-full border-4 border-gray-300" />
            <p className="text-xs text-gray-500">{story.user.username}</p>
        </div>
    );

}