import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/objectHelpers"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'users/TOGGLE_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    fake: 10,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FAKE': return { ...state, fake: state.fake + 1 }
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true })
                /* usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user
                }) */
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false })
                /* usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user
                }) */
            }
        case SET_USERS:
            return {
                ...state,
                usersData: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_FETCHING:
            if (state.isFetching) {
                return {
                    ...state,
                    isFetching: false
                }
            } else {
                return {
                    ...state,
                    isFetching: true
                }
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            debugger
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const acceptFollow = (userId) => ({ type: FOLLOW, userId })
export const acceptUnfollow = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleFetching = () => ({ type: TOGGLE_FETCHING })
export const toggleFollowing = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleFetching())
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleFetching())
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersAPI.followRequest.bind(usersAPI), acceptFollow, userId)
}

export const unFollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersAPI.unfollowRequest.bind(usersAPI), acceptUnfollow, userId)
}

async function followUnfollowFlow(dispatch, apiMethod, actionCreator, userId) {
    dispatch(toggleFollowing(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId))
}

export default userReducer