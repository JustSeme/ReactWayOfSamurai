import { ThunkAction } from 'redux-thunk'
import { auth } from './authReducer'
import { AppStateType } from './redux-store'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
    initialized: false,
}

export type InitalStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitalStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type ActionsType = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeAppThunkCreator = (): ThunkType => (dispatch) => {
    const promise = dispatch(auth())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer