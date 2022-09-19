import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import PostFormContainer from "../PostForm/PostFormContainer";

function MyPosts({ postsData, ...props }) {
    const postsElements = postsData ? [...postsData].reverse().map((post) => <Post post={post} key={post.id} />) : ''

    return (
        <div>
            <PostFormContainer />
            <h2>My Posts</h2>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts