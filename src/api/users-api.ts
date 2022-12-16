import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
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

export type FollowResponseType = {
    data: { }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, searchedName: string, isFriendsOnly: boolean | null) {
        let queryParams = searchedName ? `&term=${searchedName}` : ''
        queryParams += isFriendsOnly ? `&friend=${isFriendsOnly}` : ''
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}${queryParams}`).then(response => response.data)
    },
    followRequest(id: number) {
        return instance.post<FollowResponseType>(`follow/${id}`).then(response => response.data)
    },
    unfollowRequest(id: number) {
        return instance.delete<FollowResponseType>(`follow/${id}`).then(response => response.data)
    }
}