import React from "react"
import style from './Post.module.css'
import noAvatar from '../../../../img/noAvatar.jpg'
import { PostType } from "../../../../types/types"

type PropsType = {
    post: PostType
}

const Post: React.FC<PropsType> = ({ post }) => {
    return (
        <div className={style.item} key={post.id}>
            <div>
                <img alt='avatar' src={post.avatar ? post.avatar : noAvatar} />
                <span className={style.username}>{post.title ? post.title : 'noname'}</span>
            </div>
            <span className={style.mainText}>{post.body ? post.body : 'Текст отсутствует...'}</span>
        </div>
    )
}

export default Post