import veronika from '../img/avatar.png'

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'

const initialstate = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ],
    newPostText: '',
    newPostTitleText: '',
}

const profileReducer = (state = initialstate, action) => {
    let stateCopy
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
        default:
            break;
    }

    return state
}

export default profileReducer