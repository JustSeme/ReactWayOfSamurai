import { instance, ResultCodeEnum, ResultCodeForCaptcha } from './users-api'

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    data: { }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type GetCaptchaResponseType = {
    url: string
}

export const authAPI = {
    authMe() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(response => response.data)
    },
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(response => response.data)
    }
}