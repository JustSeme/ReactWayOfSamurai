import { PhotosType, ProfileType } from "../types/types"
import { instance, ResultCodeEnum } from "./users-api"

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