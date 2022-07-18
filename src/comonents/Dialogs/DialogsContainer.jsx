import Dialogs from './Dialogs'
import { onMessageChangeActionCreator, newMessageActionCreator } from '../../redux/store'
import StoreContext from '../../StoreContext'

function DialogsContainer() {
    return (
        <StoreContext.Consumer>
            {(store) => {
                const newMessage = () => {
                    store.dispatch(newMessageActionCreator())
                }

                const onMessageChange = (text) => {
                    store.dispatch(onMessageChangeActionCreator(text))
                }
                return <Dialogs dialogsPage={store.getState().dialogsPage} onMessageChange={onMessageChange} newMessage={newMessage} />
            }
            }
        </StoreContext.Consumer>)
}

export default DialogsContainer