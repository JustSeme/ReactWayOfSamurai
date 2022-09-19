const ADD_MESSAGE = 'dialogs/ADD_MESSAGE'

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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: Date.now(),
                messageText: action.newMessageText
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }
        default:
            break
    }

    return state
}

export const newMessageActionCreator = (newMessageText) => ({ type: ADD_MESSAGE, newMessageText })

export default dialogsReducer