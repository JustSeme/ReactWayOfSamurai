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
    let stateCopy = { ...state }
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: Date.now(),
                title: stateCopy.newPostTitleText,
                body: stateCopy.newPostText,
            }
            stateCopy.postsData = [...state.postsData]
            stateCopy.postsData.push(newPost)
            stateCopy.newPostTitleText = ''
            stateCopy.newPostText = ''
            return stateCopy;
        case UPDATE_POST_TITLE:
            stateCopy.newPostTitleText = action.newPostTitleText
            return stateCopy
        case UPDATE_POST_TEXT:
            stateCopy.newPostText = action.newPostText
            return stateCopy
        default:
            break;
    }

    return state
}

export default profileReducer