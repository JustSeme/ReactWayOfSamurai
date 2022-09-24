import React from "react"
import style from './Post.module.css'
import noAvatar from '../../../../img/noAvatar.jpg'

function Post({ post }) {

    return (
        <div className={style.item}>
            <div>
                <img src={post.avatar ? post.avatar : noAvatar} />
                <span className={style.username}>{post.title ? post.title : 'noname'}</span>
            </div>
            <span className={style.mainText}>{post.body ? post.body : 'Текст отсутствует...'}</span>
        </div>
    )
}

export default Post