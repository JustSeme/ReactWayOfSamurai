import { acceptFollow, acceptUnfollow, followThunkCreator, toggleFollowing, unFollowThunkCreator } from "./userReducer"
import { FollowResponseType, usersAPI } from "../api/users-api"
jest.mock('../api/api')

const resp: FollowResponseType = {
    data: {},
    messages: [],
    resultCode: 0
}

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.followRequest.mockClear()
    usersAPIMock.unfollowRequest.mockClear()
})

test('success follow thunk', async () => {
    const thunk = followThunkCreator(1)

    usersAPIMock.followRequest.mockReturnValue(Promise.resolve(resp))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, acceptFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowing(false, 1))
})

test('success unFollow thunk', async () => {
    const thunk = unFollowThunkCreator(1)

    usersAPIMock.unfollowRequest.mockReturnValue(Promise.resolve(resp))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, acceptUnfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowing(false, 1))
})