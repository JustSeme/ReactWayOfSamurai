import { headerAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData
            }
        case TOGGLE_IS_AUTH:
            if (state.isFetching) {
                return {
                    ...state,
                    isAuth: false
                }
            } else {
                return {
                    ...state,
                    isAuth: true
                }
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, userData: { userId, email, login } })
export const toggleIsAuth = () => ({ type: TOGGLE_IS_AUTH })

export const auth = () => (dispatch) => {
    headerAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {
                const { id, login, email } = data.data
                dispatch(setAuthUserData(id, email, login))
                dispatch(toggleIsAuth())
            }
        })
}

export default authReducer