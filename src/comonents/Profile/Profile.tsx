import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import { useSelector } from 'react-redux'
import { AppStateType, useTypedDispatch } from '../../redux/redux-store'
import { getProfileThunkCreator, getUserStatusThunkCreator } from '../../redux/profileReducer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export type PropsProfileType = {
    router: any
}

const Profile: React.FC<PropsProfileType> = (props) => {
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const userId = Number(useParams().userId)
    const isOwner = !userId

    const dispatch = useTypedDispatch()
    
    useEffect(() => {
        dispatch(getProfileThunkCreator(userId ? userId : authorizedUserId as number))
        dispatch(getUserStatusThunkCreator(userId ? userId : authorizedUserId as number))
    }, [userId, authorizedUserId, dispatch])

    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
            />
            <MyPosts />
        </div >
    )
}

export default WithAuthRedirect(Profile)