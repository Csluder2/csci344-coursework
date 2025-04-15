import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post.jsx";

export default function Posts({ token }) {
    //When useState is invoked it returns an array with two values:
    // 1. state variable
    // 2. function whose job is to set the state variable
    //    and then redraw the screen after the variable is set. 
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const data = await getDataFromServer(token, "/api/posts/");
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    function outputPost(postObj) 
    {
        return <Post token={token} key={postObj.id} postData={postObj}/>
    }
    return (
        <div>
        {
            posts.map(outputPost)
        }
        </div>
    );
    
}
