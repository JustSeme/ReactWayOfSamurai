import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import PostFormContainer from "../PostForm/PostFormContainer";
import { PostType } from "../../../types/types";

type PropsType = { 
    postsData: Array<PostType>
}

const MyPosts: React.FC<PropsType> = ({ postsData }) => {
    const postsElements = postsData ? [...postsData].map((post) => <Post post={post} key={post.id} />) : ''

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