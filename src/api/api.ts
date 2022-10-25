import axios from 'axios'
import { PhotosType, ProfileType, UserType } from '../types/types'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '94903ebe-57b5-4d2f-abcd-1ef2c44b023f'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type FollowResponseType = {
    data: { }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    followRequest(id: number) {
        return instance.post<FollowResponseType>(`follow/${id}`).then(response => response.data)
    },
    unfollowRequest(id: number) {
        return instance.delete<FollowResponseType>(`follow/${id}`).then(response => response.data)
    }
}

type UpdateStatusResponseType = {
    data: { }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type UpdateProfileInfoResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, { status }).then(response => response.data)
    },
    savePhoto(photoFile: string) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    updateProfileInfo(newProfileInfo: ProfileType) {
        return instance.put<UpdateProfileInfoResponseType>(`profile`, { ...newProfileInfo }).then(response => response.data)
    },
    getIsFollow(userId: number) {
        return instance.get<boolean>(`follow/${userId}`).then(response => response.data)
    }
}

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