import { createSelector } from 'reselect'
import { AppStateType } from '../redux-store'

const getUsers = (state: AppStateType) => {
    return state.usersPage.usersData
}

export const getUsersSelector = createSelector(getUsers, usersData => {
    return usersData.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getIsSearching = (state: AppStateType) => {
    return state.usersPage.isSearching
}