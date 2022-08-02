import veronika from '../img/avatar.png'

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialstate = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ],
    newPostText: '',
    newPostTitleText: '',
    profile: null,
    userId: 0,
}

const profileReducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: Date.now(),
                title: state.newPostTitleText,
                body: state.newPostText,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostTitleText: '',
                newPostText: '',
            }
        case UPDATE_POST_TITLE:
            return {
                ...state,
                newPostTitleText: action.newPostTitleText,
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                newPostText: action.newPostText,
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            break;
    }

    return state
}

export default profileReducer

export const newPostActionCreator = () => ({ type: ADD_POST })
export const onPostChangeActionCreator = (text) => ({ type: UPDATE_POST_TEXT, newPostText: text })
export const onPostTitleChangeActionCreator = (text) => ({ type: UPDATE_POST_TITLE, newPostTitleText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })