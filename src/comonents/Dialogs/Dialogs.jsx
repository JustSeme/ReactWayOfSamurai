import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import MyButton from '../UI/button/MyButton'

function Dialogs({ dialogsPage, onMessageChange, newMessage, ...props }) {
    const dialogsElements = dialogsPage.dialogsData ? dialogsPage.dialogsData.map(dialog => <DialogItem key={dialog.id} id={dialog.id}>{dialog.name}</DialogItem>) : ''
    const messagesElements = dialogsPage.messagesData ? dialogsPage.messagesData.map(message => <MessageItem key={message.id}>{message.messageText}</MessageItem>) : ''

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <h3 style={{ 'textAlign': 'center' }}>Messages</h3>
                {messagesElements}
                <div className={style.messageForm}>
                    <textarea onChange={(e) => onMessageChange(e.target.value)} value={dialogsPage.newMessageText} placeholder='Введите сообщение...'></textarea>
                    <MyButton onClick={newMessage}>Отправить сообщение</MyButton>
                </div>
            </div>
        </div >
    )
}

export default Dialogs