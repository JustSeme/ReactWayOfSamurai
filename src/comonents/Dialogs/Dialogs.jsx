import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import MyButton from '../UI/button/MyButton'
import { onMessageChangeActionCreator, newMessageActionCreator } from '../../store'

function Dialogs({ dialogsPage, dispatch, ...props }) {
    const dialogsElements = dialogsPage.dialogsData.map(dialog => <DialogItem key={dialog.id} id={dialog.id}>{dialog.name}</DialogItem>)
    const messagesElements = dialogsPage.messagesData.map(message => <MessageItem key={message.id}>{message.messageText}</MessageItem>)

    const newMessage = () => {
        dispatch(newMessageActionCreator())
    }

    const onMessageChange = (e) => {
        dispatch(onMessageChangeActionCreator(e.target.value))
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <h3 style={{ 'textAlign': 'center' }}>Messages</h3>
                {messagesElements}
                <div className={style.messageForm}>
                    <textarea onChange={(e) => onMessageChange(e)} value={dialogsPage.newMessageText} placeholder='Введите сообщение...'></textarea>
                    <MyButton onClick={newMessage}>Отправить сообщение</MyButton>
                </div>
            </div>
        </div >
    )
}

export default Dialogs