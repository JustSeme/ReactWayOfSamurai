import { usersAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

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
                usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user
                })
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

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleFetching())
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleFetching())
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}

export const follow = (userId) => (dispatch) => {
    dispatch(toggleFollowing(true, userId))
    usersAPI.followRequest(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(acceptFollow(userId))
        }
        dispatch(toggleFollowing(false, userId))
    })
}

export const unFollow = (userId) => (dispatch) => {
    dispatch(toggleFollowing(true, userId))
    usersAPI.unfollowRequest(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(acceptUnfollow(userId))
        }
        dispatch(toggleFollowing(false, userId))
    })
}

export default userReducer