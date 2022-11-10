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
import { getCurrentPage, getFollowingInProgress, getIsFetching, getIsSearching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/usersSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

const Users: React.FC = () => {
    const [searchedName, setSearchedName] = useState('')
    const [isFriendsOnly, setIsFriendsOnly] = useState(false)

    const debouncedSearchedName = useDebounce(searchedName, 500)

    const currentPage: number = useSelector(getCurrentPage)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const pageSize: number = useSelector(getPageSize)
    const usersData: Array<UserType> = useSelector(getUsersSelector)
    const isFetching: boolean = useSelector(getIsFetching)
    const isSearching: boolean = useSelector(getIsSearching)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    useEffect(() => {
        let {page, term, friend} = queryString.parse(location.search)
        if(!term) term = ''
        const actualFriendsOnly = friend === 'true' ? true : false
        let actualPage = currentPage
        if(page) dispatch(setCurrentPageActionCreator(Number(page)))
        if(term) setSearchedName(term as string)
        if(friend) setIsFriendsOnly(actualFriendsOnly)

        dispatch(getUsersThunkCreator(actualPage, pageSize, debouncedSearchedName, isFriendsOnly))
    }, [location.search])

    //update queryParams when filter changed
    useEffect(() => {
        let queryParams = `page=${currentPage}`
        queryParams += debouncedSearchedName ? `&term=${debouncedSearchedName}` : ''
        queryParams += isFriendsOnly ? `&friend=${isFriendsOnly}` : ''
        navigate(`?${queryParams}`)
        debugger
    }, [debouncedSearchedName, isFriendsOnly, currentPage, navigate])

    useEffect(() => {
        dispatch(setCurrentPageActionCreator(1))
    }, [debouncedSearchedName, isFriendsOnly])

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