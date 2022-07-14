import veronika from './img/avatar.png'

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
            newMessageText: 'hello world',
        },
        profilePage: {
            postsData: [],
        },
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
    _subscriber() {
        console.log('no subscribers(observers)');
    },
    subscribe(observer) {
        this._subscriber = observer
    },
    getState() {
        return this._state
    }
}

window.store = store

export default store