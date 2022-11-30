import { ChatMessage } from "./ChatMessage/ChatMessage"
import { useSelector } from "react-redux"
import { AppStateType } from "../../../../redux/redux-store"
import React, { useEffect, useRef, useState, } from "react"
import { ChatMessageType } from "../../../../redux/chatReducer"

export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if((Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight) < 730)  {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        //Здесь надо бы адаптивный height
        <div style={{height: 730, overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageType, index: number) => <ChatMessage message={m} key={m.id} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}