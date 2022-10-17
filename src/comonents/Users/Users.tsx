import React from 'react';
import MyPaginator from '../UI/MyPaginator/MyPaginator';
import User from './User';
import {UserType} from '../../types/types'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { useDispatch } from 'react-redux';
import { followThunkCreator, getUsersThunkCreator, setCurrentPageActionCreator, unFollowThunkCreator } from '../../redux/userReducer';

const Users: React.FC = () => {
    const currentPage: number = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const totalUsersCount: number = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const pageSize: number = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const usersData: Array<UserType> = useSelector((state: AppStateType) => state.usersPage.usersData)
    const followingInProgress: Array<number> = useSelector((state: AppStateType) => state.usersPage.followingInProgress)

    const dispatch = useDispatch()
    const setCurrentPage = (page: number) => dispatch(setCurrentPageActionCreator(page))
    const getUsers = (currentPage: number, pageSize: number) => dispatch(getUsersThunkCreator(currentPage, pageSize))
    const follow = (userId: number) => followThunkCreator(userId)
    const unFollow = (userId: number) => unFollowThunkCreator(userId)

    
    getUsers(currentPage, pageSize)

    const onPageChanged = (page: number) => {
        setCurrentPage(page)
        getUsers(page, pageSize)
    }

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