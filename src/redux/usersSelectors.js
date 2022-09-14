import { createSelector } from 'reselect'

const getUsers = state => {
    return state.usersPage.usersData
}

export const getUsersSelector = createSelector(getUsers, usersData => {
    return usersData.filter(u => true)
})

export const getPageSize = state => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = state => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = state => {
    return state.usersPage.currentPage
}

export const getIsFetching = state => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress
}