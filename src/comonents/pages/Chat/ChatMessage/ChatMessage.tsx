import { Avatar } from "antd"
import { ChatMessageType } from "../ChatPage"
import style from  './ChatMessage.module.css'

type MessagePropsType = {
    message: ChatMessageType
}

export const Message: React.FC<MessagePropsType> = ({ message }) => {
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
}
