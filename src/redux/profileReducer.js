import veronika from '../img/avatar.png'

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'

const initialState = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: veronika },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ],
    newPostText: '',
    newPostTitleText: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: Date.now(),
                title: state.newPostTitleText,
                body: state.newPostText,
            }
            state.postsData.push(newPost)
            state.newPostTitleText = ''
            state.newPostText = ''
            return state;
        case UPDATE_POST_TITLE:
            state.newPostTitleText = action.newPostTitleText
            return state
        case UPDATE_POST_TEXT:
            state.newPostText = action.newPostText
            return state
        default:
            break;
    }

    return state
}

export default profileReducer