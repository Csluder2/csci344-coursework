import React, {useState} from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton ({ likeId, postId, token})
{

    const [like, setLike] = useState(likeId);

    async function addLike()
    {
        const sendData = {
            post_id:postId,
        };
        const responseData = await postDataToServer(token, "/api/likes/", sendData);
        console.log(responseData);
        setLike(responseData.id);
    }

    async function removeLike()
    {
        const responseData = await deleteDataFromServer(token, "/api/likes/" + like);
        console.log(responseData);
        setLike(null);
    }

    if (like)
    {
        return (<button aria-label="like button" aria-checked="true" onClick={removeLike}>
            <i className="fas text-red-700 fa-heart"></i></button>);
    } else {
        return (<button aria-label="unlike button" aria-checked="false" onClick={addLike}>
            <i className="far fa-heart"></i></button>);
    }
    
}