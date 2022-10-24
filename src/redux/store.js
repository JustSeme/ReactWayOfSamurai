import veronika from '../img/avatar.png'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'

let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                { name: 'Dmitriy', id: 1 },
                { name: 'Veronika', id: 2 },
                { name: 'Vera', id: 3 },
                { name: 'Victoria', id: 4 },
                { name: 'Egor', id: 5 },
            ],
            messagesData: [
                { messageText: 'Hey! How are you?', id: 1 },
                { messageText: 'Why did you ignore me?', id: 2 },
                { messageText: "I'm just writing messages", id: 3 },
            ],
            newMessageText: '',
        },
        profilePage: {
            postsData: [
                { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
                { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
            ],
            newPostText: '',
            newPostTitleText: '',
        },
    },
    _subscriber() {
        console.log('no subscribers(observers)');
    },
    onMessageChange(e) {
        this._state.dialogsPage.newMessageText = e.target.value
        this._subscriber(this._state)
    },
    newMessage() {
        const newMessage = {
            id: Date.now(),
            messageText: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messagesData.push(newMessage)
        this._state.dialogsPage.newMessageText = ''
        this._subscriber(this._state)
    },
    subscribe(observer) {
        this._subscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._subscriber(this._state)
    },
}



export default store