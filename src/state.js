import veronika from './img/avatar.png'

let rerenderEntiresTree

const state = {
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
        onMessageChange: (e) => {
            state.dialogsPage.newMessageText = e.target.value
            rerenderEntiresTree(state)
        },
        newMessage: () => {
            const newMessage = {
                id: Date.now(),
                messageText: state.dialogsPage.newMessageText
            }
            state.dialogsPage.messagesData.push(newMessage)
            state.dialogsPage.newMessageText = ''
            rerenderEntiresTree(state)
        }
    },
    profilePage: {
        postsData: [],
    },
    subscribe: (observer) => {
        rerenderEntiresTree = observer
    }
}

window.state = state

export default state