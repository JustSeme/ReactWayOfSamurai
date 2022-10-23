import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import PostForm from "../PostForm/PostForm";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

const MyPosts: React.FC = (props) => {
    const postsData = useSelector((state: AppStateType) => state.profilePage.postsData)

    const postsElements = postsData ? [...postsData].map((post) => <Post post={post} key={post.id} />) : ''

    return (
        <div>
            <PostForm />
            <h2>My Posts</h2>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts