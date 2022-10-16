import { auth } from './authReducer'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
    initialized: false,
}

export type InitalStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitalStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(auth())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer