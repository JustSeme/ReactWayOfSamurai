import veronika from '../img/avatar.png'
import { ResultCodeEnum } from '../api/users-api'
import { PostType } from '../types/types'
import { ProfileType } from '../types/types'
import { PhotosType } from '../types/types'
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk'
import { profileAPI } from '../api/profile-api'

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const TOGGLE_IS_FOLLOW = 'profile/TOGGLE_IS_FOLLOW'
const SET_AUTH_PHOTO = 'profile/SET_AUTH_PHOTO'

const initialState = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    authPhoto: null as string | null,
    status: '',
    isFollow: false,
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: Date.now(),
                title: action.newPostTitleText,
                body: action.newPostText,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    userId: action.profile.userId,
                    aboutMe: action.profile.aboutMe,
                    contacts: { ...action.profile.contacts },
                    fullName: action.profile.fullName,
                    lookingForAJob: action.profile.lookingForAJob,
                    lookingForAJobDescription: action.profile.lookingForAJobDescription,
                    photos: action.profile.photos ? action.profile.photos : state?.profile?.photos
                } as ProfileType
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, ...action.photos } as ProfileType
            }
        case TOGGLE_IS_FOLLOW:
            return {
                ...state,
                isFollow: action.isFollow
            }
        case SET_AUTH_PHOTO: 
            return {
                ...state,
                authPhoto: action.photo
            }
        default:
            break;
    }

    return state
}

type ActionsType = NewPostActionType | DeletePostActionType | SetUserProfileActionType | SetUserStatusActionType | SavePhotoSuccessActionType | ToggleIsFollowActionType | SetAuthPhotoActionType

export default profileReducer

type NewPostActionType = {
    type: typeof ADD_POST
    newPostText: string
    newPostTitleText: string
}
export const newPostActionCreator = (newPostText: string, newPostTitleText: string): NewPostActionType => ({ type: ADD_POST, newPostText, newPostTitleText })

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetUserStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_STATUS, status })

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })

type ToggleIsFollowActionType = {
    type: typeof TOGGLE_IS_FOLLOW
    isFollow: boolean
}
const toggleIsFollow = (isFollow: boolean): ToggleIsFollowActionType => ({ type: TOGGLE_IS_FOLLOW, isFollow })

type SetAuthPhotoActionType = {
    type: typeof SET_AUTH_PHOTO
    photo: string | null
}

const setAuthPhoto = (photo: string | null): SetAuthPhotoActionType => ({type: SET_AUTH_PHOTO, photo})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getProfileThunkCreator = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatusThunkCreator = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data))
}

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserStatus(status))
    }
}

export const savePhotoThunkCreator = (file: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(savePhotoSuccess(data.data))
    }
}

export const updateProfileInfoThunkCreator = (newProfileInfo: ProfileType): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateProfileInfo(newProfileInfo)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserProfile(newProfileInfo))
    } else if (data.resultCode === ResultCodeEnum.Error) {
        alert(data.messages[0])
    }
}

export const getIsFollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getIsFollow(userId)
    dispatch(toggleIsFollow(data))
}

export const getAuthPhotoThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setAuthPhoto(data.photos.small))
}