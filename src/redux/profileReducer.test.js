import profileReducer, { newPostActionCreator, deletePost } from "./profileReducer";

const state = {
    postsData: [
        { id: 1, title: 'Вероника', body: 'Всем привет!', avatar: 'none' },
        { id: 2, title: 'Егор', body: 'Привет, Вероника!' },
    ],
    profile: null,
    userId: 0,
    status: '',
}

it('length of postsData should be incremented', () => {
    //1. test data
    //2. action
    let action = newPostActionCreator('NewPostText')
    //3. expectation
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(3)
})

it('body of new post should be correct', () => {
    //1. test data

    //2. action
    let action = newPostActionCreator('NewPostText')
    //3. expectation
    let newState = profileReducer(state, action)
    expect(newState.postsData[2].body).toBe('NewPostText')
})

it('after deleting length of postsData should be decrement', () => {
    //1. test data

    //2. action
    let action = deletePost(1)
    //3. expectation
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(1)
})

it('after deleting length of postsData shouldn`t be decrement if id is incorrect', () => {
    //1. test data

    //2. action
    let action = deletePost(100)
    //3. expectation
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(2)
})