import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import MyButton from '../UI/MyButton/MyButton'
import { Form, Field } from 'react-final-form'
import MyTextarea from '../UI/MyTextarea/MyTextarea'
import { maxLengthCreator, required, composeValidators } from '../../utils/validators'
import { DialogType, MessageType } from '../../types/types'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { useDispatch } from 'react-redux'
import { newMessageActionCreator } from '../../redux/dialogsReducer'
import WithAuthRedirect from '../HOC/WithAuthRedirect'

const Dialogs = () => {
    const dialogsData: Array<DialogType> = useSelector((state: AppStateType) => state.dialogsPage.dialogsData)
    const messagesData: Array<MessageType> = useSelector((state: AppStateType) => state.dialogsPage.messagesData)

    const dispatch = useDispatch()
    const newMessage = (newMessageText: string) => {
        dispatch(newMessageActionCreator(newMessageText))
    }

    const dialogsElements = dialogsData ? dialogsData.map(dialog => <DialogItem key={dialog.id} id={dialog.id}>{dialog.name}</DialogItem>) : ''
    const messagesElements = messagesData ? messagesData.map(message => <MessageItem key={message.id}>{message.messageText}</MessageItem>) : ''

    type FormDataType = {
        newMessageText: string
    }

    const onSubmit = (formData: FormDataType) => {
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
                    render={({ handleSubmit, invalid }) => (
                        <form className={style.messageForm} onSubmit={handleSubmit}>
                            <Field
                                validate={composeValidators(required, maxLengthCreator(50))}
                                name='newMessageText'
                                component={MyTextarea}

                                placeholder='Введите сообщение...'
                            />
                            <MyButton disabled={invalid}>Отправить сообщение</MyButton>
                        </form>
                    )}
                >
                </Form>
            </div>
        </div >
    )
}

export default WithAuthRedirect(Dialogs)