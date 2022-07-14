import React, { useEffect, useState } from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import PostFrom from "../../PostForm/PostFrom";
import axios from "axios";

function MyPosts({ postsData, ...props }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(result => result.data)
            .then(async (postsResponse) => {
                let postsWithAva = await Promise.all(postsResponse.map(async post => {
                    let avatar = await axios.get(`https://jsonplaceholder.typicode.com/photos/${post.id}`)
                    post.avatar = avatar.data.thumbnailUrl
                    return post
                }))
                return postsWithAva
            }).then(postsWithAva => setPosts(postsWithAva))
    }, [])

    const postsElements = posts.map((post) => <Post post={post} key={post.id} />)

    return (
        <div>
            <PostFrom setPost={setPosts} posts={posts} />
            <h2>My Posts</h2>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts