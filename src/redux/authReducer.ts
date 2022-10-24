import { authAPI, ResultCodeEnum, ResultCodeForCaptcha } from "../api/api"
import { FORM_ERROR } from "final-form"
import { LoginThunkType } from "../types/types"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const TOGGLE_IS_AUTH = 'auth/TOGGLE_IS_AUTH'
const TOGGLE_IS_CAPTCHA = 'auth/TOGGLE_IS_CAPTCHA'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isCaptcha: false,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData
            }
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: true
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

type ActionsType = setAuthUserDataActionType | ToggleIsAuthActionType | ToggleIsCaptchaActionType

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    userData: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
    }
}

type ToggleIsAuthActionType = {
    type: typeof TOGGLE_IS_AUTH,
}

type ToggleIsCaptchaActionType = {
    type: typeof TOGGLE_IS_CAPTCHA,
    bool: boolean,
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({ type: SET_USER_DATA, userData: { userId, email, login, isAuth } })
export const toggleIsAuth = (): ToggleIsAuthActionType => ({ type: TOGGLE_IS_AUTH })
export const toggleIsCaptcha = (bool: boolean): ToggleIsCaptchaActionType => ({ type: TOGGLE_IS_CAPTCHA, bool })

type ThunkType = ThunkAction<Promise<any>, AppStateType, unknown, ActionsType>

export const auth = () => async (dispatch: any) => {
    let data = await (await authAPI.authMe())
    if (data.resultCode === ResultCodeEnum.Success) {
        const { id, login, email } = data.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(toggleIsAuth())
    }
}

export const login: LoginThunkType = (email, password, rememberMe = false, captcha = false): ThunkType => (dispatch) => {
    return new Promise(async (reject) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(auth())
        } else if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            authAPI.getCaptcha().then(captchaData => {
                dispatch(toggleIsCaptcha(true))
                let captchaDOM = document.getElementById('captcha')
                if (captchaDOM) {
                    captchaDOM.innerHTML = ''
                    let elem = document.createElement("img")
                    elem.src = captchaData.url
                    captchaDOM.append(elem)
                }
                const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                reject({ [FORM_ERROR]: message })
            })
        } else {
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            reject({ [FORM_ERROR]: message })
        }
    })
}

export const logoutActionCreator = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(toggleIsAuth())
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer