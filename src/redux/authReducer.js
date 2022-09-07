import { authAPI } from "../api/api"
import { FORM_ERROR } from "final-form"

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH'
const TOGGLE_IS_CAPTCHA = 'TOGGLE_IS_CAPTCHA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isCaptcha: false,
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
        case TOGGLE_IS_CAPTCHA:
            if (action.bool) {
                return {
                    ...state,
                    isCaptcha: true,
                }
            } else {
                return {
                    ...state,
                    isCaptcha: false,
                }
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, userData: { userId, email, login, isAuth } })
export const toggleIsAuth = () => ({ type: TOGGLE_IS_AUTH })
export const toggleIsCaptcha = (bool) => ({ type: TOGGLE_IS_CAPTCHA, bool })

export const auth = () => (dispatch) => {
    return authAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {
                const { id, login, email } = data.data
                dispatch(setAuthUserData(id, email, login, true))
                dispatch(toggleIsAuth())
            }
        })
}

export const login = (email, password, rememberMe = false, captcha = false) => (dispatch) => {
    return new Promise((reject) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(auth())
                } else if (data.resultCode === 10) {
                    authAPI.getCaptcha().then(captchaData => {
                        dispatch(toggleIsCaptcha(true))
                        document.getElementById('captcha').innerHTML = ''

                        let elem = document.createElement("img")
                        elem.src = captchaData.url
                        document.getElementById('captcha').append(elem)

                        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                        reject({ [FORM_ERROR]: message })
                    })
                } else {
                    const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                    reject({ [FORM_ERROR]: message })
                }
            })
    })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(toggleIsAuth())
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer