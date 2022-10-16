const ADD_MESSAGE = 'dialogs/ADD_MESSAGE'

type DialogType = {
    name: string,
    id: number,
}
type MessageType = {
    messageText: string,
    id: number,
}

const initialState = {
    dialogsData: [
        { name: 'Dmitriy', id: 1 },
        { name: 'Veronika', id: 2 },
        { name: 'Vera', id: 3 },
        { name: 'Victoria', id: 4 },
        { name: 'Egor', id: 5 },
    ] as Array<DialogType>,
    messagesData: [
        { messageText: 'Hey! How are you?', id: 1 },
        { messageText: 'Why did you ignore me?', id: 2 },
        { messageText: "I'm just writing messages", id: 3 },
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {
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

type NewMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string,
}
export const newMessageActionCreator = (newMessageText: string): NewMessageActionType => ({ type: ADD_MESSAGE, newMessageText })

export default dialogsReducer