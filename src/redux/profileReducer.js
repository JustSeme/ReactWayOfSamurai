const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'

const profileReducer = (state, action) => {
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