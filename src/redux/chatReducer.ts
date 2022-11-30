import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api"
import { AppStateType } from "./redux-store"
import { v1 } from 'uuid'

const MESSAGES_RECEIVED = 'SN/chat/MESSAGES_RECEIVED'
const STATUS_CHANGED = 'SN/chat/STATUS_CHANGED'

export type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    isStatusChanged: false,
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100)
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.status,
                isStatusChanged: true
            }
        default:
            break
    }

    return state
}



export const messagesReceived = (messages: ChatMessageType[]): MessagesReceivedActionType => ({ type: MESSAGES_RECEIVED, messages })

type MessagesReceivedActionType = {
    type: typeof MESSAGES_RECEIVED
    messages: ChatMessageType[]
}

export const statusChanged = (status: StatusType): StatusChangedActionType => ({ type: STATUS_CHANGED, status })

type StatusChangedActionType = {
    type: typeof STATUS_CHANGED
    status: StatusType
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListenning = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListenning = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (messageText: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(messageText)
}

type ActionsType = MessagesReceivedActionType | StatusChangedActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export default chatReducer