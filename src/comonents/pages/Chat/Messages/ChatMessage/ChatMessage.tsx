import { Avatar } from "antd"
import style from  './ChatMessage.module.css'
import React from 'react'
import { ChatMessageType } from "../../../../../redux/chatReducer"

type MessagePropsType = {
    message: ChatMessageType
}

export const ChatMessage: React.FC<MessagePropsType> = React.memo(({ message }) => {
    const userLink = `/profile/${message.userId}`
    return (
        <div style={{position: 'relative'}}>
            <hr/>
            <a href={userLink}>
                <div><b style={{fontSize: 16}}>{message.userName}</b></div>
                <Avatar
                    shape='square'
                    size='large'
                    src={message.photo}
                />
            </a>
            <p className={style.textMessage}>{message.message}</p>
        </div>
    )
})
