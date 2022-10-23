import veronika from '../img/avatar.png'
import { profileAPI } from '../api/api'
import { PostType } from '../types/types'
import { ProfileType } from '../types/types'
import { PhotosType } from '../types/types'
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk'

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'



const initialState = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
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
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            break;
    }

    return state
}

type ActionsType = NewPostActionType | DeletePostActionType | SetUserProfileActionType | SetUserStatusActionType | SavePhotoSuccessActionType

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
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhotoThunkCreator = (file: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const updateProfileInfoThunkCreator = (newProfileInfo: ProfileType): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateProfileInfo(newProfileInfo)
    if (data.resultCode === 0) {
        dispatch(setUserProfile(newProfileInfo))
    } else if (data.resultCode === 1) {
        alert(data.messages[0])
    }
}