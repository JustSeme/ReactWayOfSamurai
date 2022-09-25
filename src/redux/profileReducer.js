import veronika from '../img/avatar.png'
import { profileAPI } from '../api/api'

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const UPDATE_PROFILE_INFO_SUCCESS = 'profile/UPDATE_PROFILE_INFO_SUCCESS'

const initialstate = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ],
    profile: null,
    userId: 0,
    status: '',
}

const profileReducer = (state = initialstate, action) => {
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
                profile: action.profile
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
                profile: { ...state.profile, photos: action.photos }
            }
        case UPDATE_PROFILE_INFO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile, aboutMe: action.newProfileInfo.aboutMe,
                    contacts: { ...action.newProfileInfo.contacts },
                    fullName: action.newProfileInfo.fullName,
                    lookingForAJob: action.newProfileInfo.lookingForAJob,
                    lookingForAJobDescription: action.newProfileInfo.lookingForAJobDescription
                }
            }
        default:
            break;
    }

    return state
}

export default profileReducer

export const newPostActionCreator = (newPostText, newPostTitleText) => ({ type: ADD_POST, newPostText, newPostTitleText })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
const setUserStatus = (status) => ({ type: SET_STATUS, status })
const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
const updateProfileInfoSuccess = (newProfileInfo) => ({ type: UPDATE_PROFILE_INFO_SUCCESS, newProfileInfo })

export const getProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const updateProfileInfo = (newProfileInfo) => async (dispatch) => {
    let data = await profileAPI.updateProfileInfo(newProfileInfo)
    if (data.resultCode === 0) {
        console.log(data);
        dispatch(updateProfileInfoSuccess(data.data))
    }
}