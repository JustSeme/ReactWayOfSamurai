import { Button } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useEffect, useState } from 'react'
import { Message } from "./ChatMessage/ChatMessage"

export type ChatMessageType = { 
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = (e: CloseEvent) => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])
    
    useEffect(() => {
        const errorHandler = (err: Event) => {
            console.error('Socket encountered error: ', err, 'Closing socket');
            wsChannel?.close()
        }
        wsChannel?.addEventListener('error', errorHandler)
        return () => {
            wsChannel?.removeEventListener('error', errorHandler)
        }
    }, [wsChannel])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
            setMessages([])
        }
    }, [wsChannel])

    return (
        //Здесь надо бы адаптивный height
        <div style={{height: 730, overflowY: 'auto'}}>
            {messages.map((m: ChatMessageType, index) => <Message message={m} key={index} />)}
        </div>
    )
}



const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({ wsChannel }) => {
    const [messageText, setMessageText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if(!messageText) return
        wsChannel?.send(messageText)
        setMessageText('')
    }

    return (
        <div>
            <TextArea onChange={(e) => setMessageText(e.target.value)} value={messageText} rows={4} />
            <Button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage} type="primary">Send</Button>
        </div>
    )
}

export default ChatPage