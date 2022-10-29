import userReducer, { acceptFollow, acceptUnfollow, InitialStateType } from "./userReducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        usersData: [
            {id: 0, name: 'Semyon 0', followed: false,
                photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Semyon 1', followed: false,
                photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Ivan 0', followed: true,
                photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Ivan 1', followed: true,
                photos: {small: null, large: null}, status: 'status 3'},
        ],
        pageSize: 5,
        totalUsersCount: 10,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [], // array of userIds
        isSearching: false,
    }
})

test('follow success', () => {
    const newState = userReducer(state, acceptFollow(1))

    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[1].followed).toBeTruthy()
})

test('unFollow success', () => {
    const newState = userReducer(state, acceptUnfollow(3))

    expect(newState.usersData[3].followed).toBeFalsy()
    expect(newState.usersData[2].followed).toBeTruthy()
})