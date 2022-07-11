import React, { useState } from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import veronika from '../../../img/avatar.png'
import PostFrom from "../../PostForm/PostFrom";

function MyPosts() {
    const [posts, setPost] = useState([
        { id: 1, avatar: veronika, username: 'Вероника', message: 'Hello World' },
        /* { id: 2, username: 'Влад', message: 'Hey! How are you?' },
        { id: 3 },
        { id: 4, username: 'Кирилл', message: "I'm fine" } */
    ])
    const postsElements = posts.map((post) => <Post post={post} key={post.id} />)

    return (
        <div>
            <PostFrom setPost={setPost} posts={posts} />
            <h2>My Posts</h2>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts