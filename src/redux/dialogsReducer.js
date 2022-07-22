const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE_MESSAGE_TEXT'

const initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: Date.now(),
                messageText: state.newMessageText
            }
            return {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, newMessage],
            }
        case UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessageText
            }
        default:
            break
    }

    return state
}

export default dialogsReducer