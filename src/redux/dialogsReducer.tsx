import { DialogType } from "../types/types"
import { MessageType } from "../types/types"
import { Link } from "react-router-dom"

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE'

const initialState = {
    dialogsData: [
        { label: <Link to='/dialogs/chat'>Developer chat</Link>, key: 5 },
        { label: <Link to='/dialogs/0'>Jerry</Link>, key: 0 },
        { label: <Link to='/dialogs/1'>Veronika</Link>, key: 1 },
        { label: <Link to='/dialogs/2'>Forrest</Link>, key: 2 },
        { label: <Link to='/dialogs/3'>Elizabeth</Link>, key: 3 },
        { label: <Link to='/dialogs/4'>Arthur</Link>, key: 4 },
    ] as Array<DialogType>,
    messagesData: [
        [
            { messageText: 'Hey! My name is Jerry', id: 1 },
            { messageText: 'Why did you ignore me?', id: 2 },
            { messageText: "I'm just writing messages", id: 3 },
        ],
        [
            { messageText: 'Hey! My name is Veronika', id: 1 },
            { messageText: 'Why did you ignore me?', id: 2 },
            { messageText: "I'm just writing messages", id: 3 },
        ],
        [
            { messageText: 'Hey! My name is Forrest Gump!', id: 1 },
            { messageText: 'Why did you ignore me?', id: 2 },
            { messageText: "I'm just writing messages", id: 3 },
        ],
        [
            { messageText: 'Hey! My name is Elizabeth', id: 1 },
            { messageText: 'Why did you ignore me?', id: 2 },
            { messageText: "I'm just writing messages", id: 3 },
        ],
        [
            { messageText: 'Hey! My name is Arthur', id: 1 },
            { messageText: 'Why did you ignore me?', id: 2 },
            { messageText: "I'm just writing messages", id: 3 },
        ]
    ] as MessageType[][],
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsType) => {
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

type ActionsType = NewMessageActionType

type NewMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string,
}
export const newMessageActionCreator = (newMessageText: string): NewMessageActionType => ({ type: ADD_MESSAGE, newMessageText })

export default dialogsReducer