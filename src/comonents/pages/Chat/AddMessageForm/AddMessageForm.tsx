import { Button } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useState } from "react"
import { sendMessage } from "../../../../redux/chatReducer"
import { useTypedDispatch } from "../../../../redux/redux-store"

type PropsType = {
    isConnected: boolean
}

export const AddMessageForm: React.FC<PropsType> = ({ isConnected }) => {
    const [messageText, setMessageText] = useState('')
    const dispatch = useTypedDispatch()

    const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && isConnected) {
            e.preventDefault()
            e.stopPropagation()
            sendMessageHandler()
        }
    }

    const sendMessageHandler = () => {
        if(!messageText) return
        dispatch(sendMessage(messageText))
        setMessageText('')
    }

    return (
        <div>
            <TextArea onChange={(e) => setMessageText(e.target.value)} value={messageText} rows={4} onKeyDown={keyDownHandler} />
            <Button disabled={!isConnected} onClick={sendMessageHandler} type="primary">Send</Button>
        </div>
    )
}