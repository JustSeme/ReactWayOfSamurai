import { Modal } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { startMessagesListenning, stopMessagesListenning } from '../../../redux/chatReducer'
import { AppStateType, useTypedDispatch } from '../../../redux/redux-store'
import { AddMessageForm } from "./AddMessageForm/AddMessageForm"
import { Messages } from "./Messages/Messages"

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status)
    const isConnected = status === 'ready'
    const isStatusChanged = useSelector((state: AppStateType) => state.chat.isStatusChanged)

    const dispatch = useTypedDispatch()
    
    useEffect(() => {
        dispatch(startMessagesListenning())
        return () => {
            dispatch(stopMessagesListenning())
        }
    }, [])

    
    const countDown = (isError: boolean) => {
        if(isError) {
            Modal.success({
                title: 'Уведомление',
                content: 'Произошла какая-то ошибка. Проверьте интренет-соединение, авторизацию в социальной сети и обновите страницу...'
            })
        } else {
            let secondsToGo = 3;
            let content = 'Одну секунду, подключаюсь...'
            
            const modal = Modal.success({
                title: 'Уведомление',
                content: content,
            });
    
            const timer = setInterval(() => {
                if(isConnected) {
                    content = 'Соединение успешно установлено! Можете писать собщения...'
                } else if(!isConnected) {
                    content = 'Что-то пошло не так, дайте мне секунду, переподключаюсь...'
                }
                modal.update({
                    content: content,
                });
            }, 1000);
            
            setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
            }, secondsToGo * 1000);
        }
    };

    if(status === 'error') {
        countDown(true)
    }

    useEffect(() => {
        if(isStatusChanged) {
            countDown(false)
        }
    }, [isConnected])

    return (
        <div>
            <Messages/>
            <AddMessageForm isConnected={isConnected} />
        </div>
    )
}

export default ChatPage