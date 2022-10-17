import React from 'react';
import MyPaginator from '../UI/MyPaginator/MyPaginator';
import User from './User';
import { UserType } from '../../types/types'
import { useSelector } from 'react-redux';
import { AppStateType, useTypedDispatch } from '../../redux/redux-store';
import { followThunkCreator, getUsersThunkCreator, setCurrentPageActionCreator, unFollowThunkCreator } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';

const Users: React.FC = () => {
    const currentPage: number = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const totalUsersCount: number = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const pageSize: number = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const usersData: Array<UserType> = useSelector((state: AppStateType) => state.usersPage.usersData)
    const followingInProgress: Array<number> = useSelector((state: AppStateType) => state.usersPage.followingInProgress)
    const isFetching: boolean = useSelector((state: AppStateType) => state.usersPage.isFetching)

    const dispatch = useTypedDispatch()
    const setCurrentPage = (page: number) => dispatch(setCurrentPageActionCreator(page))
    const getUsers = (currentPage: number, pageSize: number) => dispatch(getUsersThunkCreator(currentPage, pageSize))
    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    if(!usersData.length && !isFetching) getUsers(currentPage, pageSize)

    const onPageChanged = (page: number) => {
        setCurrentPage(page)
        getUsers(page, pageSize)
    }
    
    if(isFetching) return <MyPreloader />

    return (
        <div>
            <MyPaginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {
                usersData.map(user =>
                    <User user={user}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unFollow={unFollow}
                        key={user.id}
                    />)
            }
        </div>
    );
};

export default Users;