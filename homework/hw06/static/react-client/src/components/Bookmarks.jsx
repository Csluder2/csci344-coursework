import React, {useState} from "react";
import { postDataToServer, deleteDataFromServer} from "../server-requests";

/**
 * Job:
 *  1. Renders bookmark (if current user has post bookmarked or not)
 *  2. Create / Delete bookmarks. 
 */

export default function Bookmark({ token, bookmarkId, postId}) {

    const [bookmark, setBookmark] = useState(bookmarkId);

    async function createBookmark()
    {
        const sendData = {
            post_id: postId,
        };
        console.log("Creating bookmark...");
        //send an HTTP post request to make bookmark
        const responseData = await postDataToServer(token, "/api/bookmarks/", sendData);
        console.log(responseData);
        setBookmark(responseData.id);
    }

    async function deleteBookmark()
    {
        console.log("deleting bookmark...");
        //send an HTTP post request to delete bookmark
        const responseData = await deleteDataFromServer(token, "/api/bookmarks/" + bookmark);
        console.log(responseData);
        setBookmark(null);
    }

    if (bookmark)
    {
        return (
            <button aria-label="bookmark" aria-checked="checked"onClick={deleteBookmark}>
                <i className="fas fa-bookmark"></i>
                </button>

        );
    }
        else
        {
            return (
                <button aria-label= "remove bookmark" aria-checked = "checked" onClick={createBookmark}>
                    <i className = "far fa-bookmark"></i>

                </button>
            );
        }
    
}
