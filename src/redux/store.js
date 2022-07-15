import veronika from '../img/avatar.png'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'

const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE_MESSAGE_TEXT'
const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'


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
        this._state.profilePage = dialogsReducer(this._state.dialogsPage, action)

        this._subscriber(this._state)
    },
}

export const newMessageActionCreator = () => ({ type: ADD_MESSAGE })

export const onMessageChangeActionCreator = (text) =>
    ({ type: UPDATE_MESSAGE_TEXT, newMessageText: text, })

export const newPostActionCreator = () => ({ type: ADD_POST })

export const onPostChangeActionCreator = (text) => ({ type: UPDATE_POST_TEXT, newPostText: text })

export const onPostTitleChangeActionCreator = (text) => ({ type: UPDATE_POST_TITLE, newPostTitleText: text })

window.store = store

export default store