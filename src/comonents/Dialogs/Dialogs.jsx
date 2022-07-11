import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'

function Dialogs() {
    const dialogsData = [
        { name: 'Dmitriy', id: 1 },
        { name: 'Veronika', id: 2 },
        { name: 'Vera', id: 3 },
        { name: 'Victoria', id: 4 },
        { name: 'Egor', id: 5 },
    ]
    const messagesData = [
        { messageText: 'Hey! How are you?', id: 1 },
        { messageText: 'Why did you ignore me?', id: 2 },
        { messageText: "I'm just writing messages", id: 3 },
    ]
    const dialogsElements = dialogsData.map(dialog => <DialogItem key={dialog.id} id={dialog.id}>{dialog.name}</DialogItem>)
    const messagesElements = messagesData.map(message => <MessageItem>{message.messageText}</MessageItem>)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs