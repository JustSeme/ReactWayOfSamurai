import { DialogType } from "../types/types"
import { MessageType } from "../types/types"
import { Link } from "react-router-dom"

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE'

const initialState = {
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