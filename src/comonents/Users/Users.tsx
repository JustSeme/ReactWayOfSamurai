import React, { useState, useEffect } from 'react';
import MyPaginator from '../UI/MyPaginator/MyPaginator';
import User from './User';
import { UserType } from '../../types/types'
import { useSelector } from 'react-redux';
import { AppStateType, useTypedDispatch } from '../../redux/redux-store';
import { followThunkCreator, getUsersThunkCreator, setCurrentPageActionCreator, unFollowThunkCreator } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';
import style from './Users.module.css'
import UsersSearchForm from './UsersSearchForm';

const Users: React.FC = () => {
    const [searchedName, setSearchedName] = useState('')
    const [isFriendsOnly, setIsFriendsOnly] = useState(false)

    useEffect(() => {
        setCurrentPage(1)
        getUsers(1, pageSize, searchedName, isFriendsOnly)
    }, [searchedName, isFriendsOnly])

    const currentPage: number = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const totalUsersCount: number = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const pageSize: number = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const usersData: Array<UserType> = useSelector((state: AppStateType) => state.usersPage.usersData)
    const followingInProgress: Array<number> = useSelector((state: AppStateType) => state.usersPage.followingInProgress)
    const isFetching: boolean = useSelector((state: AppStateType) => state.usersPage.isFetching)
    const isSearching: boolean = useSelector((state: AppStateType) => state.usersPage.isSearching)

    const dispatch = useTypedDispatch()
    const setCurrentPage = (page: number) => dispatch(setCurrentPageActionCreator(page))
    const getUsers = (currentPage: number, pageSize: number, searchedName: string, isFriendsOnly: boolean) => dispatch(getUsersThunkCreator(currentPage, pageSize, searchedName, isFriendsOnly))
    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    const onPageChanged = (page: number) => {
        setCurrentPage(page)
        getUsers(page, pageSize, searchedName, isFriendsOnly)
    }
    
    if(isFetching) return <MyPreloader />

    return (
        <div style={{'textAlign': 'center'}}>
            <MyPaginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            <UsersSearchForm searchedName={searchedName} isFriendsOnly={isFriendsOnly} setSearchedName={setSearchedName} setIsFriendsOnly={setIsFriendsOnly} />
            {!usersData.length && isSearching && <p className={style.notFound}>Нам не удалось найти пользователя с таким именем :/</p>}
            <div className={style.usersWrapper}>
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
        </div>
    );
};

export default Users;