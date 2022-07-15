import React, { useEffect, useState } from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import PostForm from "../PostForm/PostForm";
import axios from "axios";

function MyPosts({ profilePage, dispatch, ...props }) {
    /* const [posts, setPosts] = useState([])

    async function fetchData() {
        try {
            const { data } = await axios.get(
                'https://jsonplaceholder.typicode.com/posts?_limit=10'
            )
            const postsWithAva = data.map(async (post) => {
                const {
                    data: { thumbnailUrl },
                } = await axios.get(
                    `https://jsonplaceholder.typicode.com/photos/${post.id}`
                )
                post.avatar = thumbnailUrl
                return post
            })
            setPosts(await Promise.all(postsWithAva))
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, []) */

    const postsElements = profilePage.postsData.map((post) => <Post post={post} key={post.id} />)

    return (
        <div>
            <PostForm dispatch={dispatch} postsData={profilePage.postsData} newPostText={profilePage.newPostText} newPostTitleText={profilePage.newPostTitleText} />
            <h2>My Posts</h2>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts