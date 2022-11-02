import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import withRouter from '../HOC/WithRouter'
import { useSelector } from 'react-redux'
import { AppStateType, useTypedDispatch } from '../../redux/redux-store'
import { getProfileThunkCreator, getUserStatusThunkCreator } from '../../redux/profileReducer'
import { useEffect } from 'react'

export type PropsProfileType = {
    router: any
}

const Profile: React.FC<PropsProfileType> = (props) => {

    const authorizedUserId  = useSelector((state: AppStateType) => state.auth.userId)
    const userId = props.router.params.userId ? props.router.params.userId : authorizedUserId
    const isOwner = !props.router.params.userId

    const dispatch = useTypedDispatch()

    const getProfile = (userId: number) => dispatch(getProfileThunkCreator(userId))
    const getUserStatus = (userId: number) => dispatch(getUserStatusThunkCreator(userId))
    
    const refreshProfile = (userId: number) => {
        getProfile(userId)
        getUserStatus(userId)
    }

    useEffect(() => {
        refreshProfile(userId)
    }, [userId])

    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
            />
            <MyPosts />
        </div >
    )
}

export default WithAuthRedirect(withRouter(Profile))