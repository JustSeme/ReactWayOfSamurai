import React, { useState, useEffect } from 'react';
import MyPaginator from '../UI/MyPaginator/MyPaginator';
import User from './User';
import { UserType } from '../../types/types'
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/redux-store';
import { followThunkCreator, getUsersThunkCreator, setCurrentPageActionCreator, unFollowThunkCreator } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';
import style from './Users.module.css'
import UsersSearchForm from './UsersSearchForm';
import useDebounce from '../../hooks/useDebounce';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getIsSearching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/selectors/usersSelectors';
import { useLocation } from 'react-router-dom';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

const Users: React.FC = () => {
    const [searchedName, setSearchedName] = useState('')
    const [isFriendsOnly, setIsFriendsOnly] = useState(false)
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [term, setTerm] = useQueryParam('term', StringParam)
    const [friend, setFriend] = useQueryParam('friend', NumberParam)

    const debouncedSearchedName = useDebounce(searchedName, 500)

    const currentPage: number = useSelector(getCurrentPage)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const pageSize: number = useSelector(getPageSize)
    const usersData: Array<UserType> = useSelector(getUsersSelector)
    const isFetching: boolean = useSelector(getIsFetching)
    const isSearching: boolean = useSelector(getIsSearching)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useTypedDispatch()
    const location = useLocation()

    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    //update UI when URL changed
    useEffect(() => {
        let actualPage = currentPage
        if(page) dispatch(setCurrentPageActionCreator(Number(page)))
        if(term) setSearchedName(term as string)
        if(friend) setIsFriendsOnly(friend === 1 ? true : false)
        dispatch(getUsersThunkCreator(actualPage, pageSize, debouncedSearchedName, isFriendsOnly))
    }, [location.search])

    //update queryParams when filter changed
    useEffect(() => {
        if(currentPage) setPage(currentPage)
        else setPage(undefined)
        if(debouncedSearchedName) setTerm(debouncedSearchedName)
        else setTerm(undefined)
        if(isFriendsOnly) setFriend(1)
        else setFriend(undefined)
    }, [debouncedSearchedName, isFriendsOnly, currentPage, setPage, setTerm, setFriend])

    useEffect(() => {
        dispatch(setCurrentPageActionCreator(1))
    }, [debouncedSearchedName, isFriendsOnly, dispatch])

    const onPageChanged = (page: number) => {
        dispatch(setCurrentPageActionCreator(page))
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
                    <User
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unFollow={unFollow}
                        user={user}
                        key={user.id}
                    />)
                }
            </div>
        </div>
    );
};

export default Users;