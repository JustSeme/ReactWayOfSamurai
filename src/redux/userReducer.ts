import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/objectHelpers"
import { UserType } from "../types/types"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'users/TOGGLE_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    usersData: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of userIds
    fake: 10,
}

export type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false })
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

type AcceptFollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const acceptFollow = (userId: number): AcceptFollowActionType => ({ type: FOLLOW, userId })
type AcceptUnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const acceptUnfollow = (userId: number): AcceptUnfollowActionType => ({ type: UNFOLLOW, userId })
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}
export const setCurrentPageActionCreator = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page })
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING
}
export const toggleFetching = (): ToggleFetchingActionType => ({ type: TOGGLE_FETCHING })
type ToggleFollowingActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowing = (isFetching: boolean, userId: number): ToggleFollowingActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleFetching())
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleFetching())
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const followThunkCreator = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, usersAPI.followRequest.bind(usersAPI), acceptFollow, userId)
}

export const unFollowThunkCreator = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, usersAPI.unfollowRequest.bind(usersAPI), acceptUnfollow, userId)
}

async function followUnfollowFlow(dispatch: any, apiMethod: any, actionCreator: any, userId: number) {
    dispatch(toggleFollowing(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId))
}

export default userReducer