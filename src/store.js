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
        if (action.type === 'ADD-MESSAGE') {
            const newMessage = {
                id: Date.now(),
                messageText: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messagesData.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._subscriber(this._state)
        } else if (action.type === 'UPDATE-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._subscriber(this._state)
        }
    },
}

window.store = store

export default store