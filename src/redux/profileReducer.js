import veronika from '../img/avatar.png'
import { profileAPI } from '../api/api'

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

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

export const getProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data))
        })
}

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId)
        .then(data => {
            dispatch(setUserStatus(data))
        })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
}