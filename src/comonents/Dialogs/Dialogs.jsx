import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import MyButton from '../UI/MyButton/MyButton'
import { Form, Field } from 'react-final-form'
import MyTextarea from '../UI/MyTextarea/MyTextarea'
import { maxLengthCreator, required, composeValidators } from '../../utils/validators'

function Dialogs({ dialogsPage, newMessage, isAuth, ...props }) {
    const dialogsElements = dialogsPage.dialogsData ? dialogsPage.dialogsData.map(dialog => <DialogItem key={dialog.id} id={dialog.id}>{dialog.name}</DialogItem>) : ''
    const messagesElements = dialogsPage.messagesData ? dialogsPage.messagesData.map(message => <MessageItem key={message.id}>{message.messageText}</MessageItem>) : ''

    const onSubmit = (formData) => {
        newMessage(formData.newMessageText)
        formData.newMessageText = ''
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <h3 style={{ 'textAlign': 'center' }}>Messages</h3>
                {messagesElements}
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form className={style.messageForm} onSubmit={handleSubmit}>
                            <Field
                                validate={composeValidators(required, maxLengthCreator(50))}
                                name='newMessageText'
                                component={MyTextarea}

                                placeholder='Введите сообщение...'
                            />
                            <MyButton>Отправить сообщение</MyButton>
                        </form>
                    )}
                >
                </Form>
            </div>
        </div >
    )
}

export default Dialogs