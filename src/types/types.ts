export type PostType = {
    id: number
    title: string
    body: string
    avatar?: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string | null
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type DialogType = {
    name: string,
    id: number,
}
export type MessageType = {
    messageText: string,
    id: number,
}
export type LoginThunkType = (
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean,
) => void