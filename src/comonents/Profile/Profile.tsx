import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import { ProfileType } from '../../types/types'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import withRouter from '../HOC/WithRouter'
import { useSelector } from 'react-redux'
import { AppStateType, useTypedDispatch } from '../../redux/redux-store'
import { getProfileThunkCreator, getUserStatusThunkCreator, savePhotoThunkCreator, updateProfileInfoThunkCreator, updateStatusThunkCreator } from '../../redux/profileReducer'
import { useEffect } from 'react'

export type PropsProfileType = {
    router: any
}

const Profile: React.FC<PropsProfileType> = (props) => {
    
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const authorizedUserId  = useSelector((state: AppStateType) => state.auth.userId)

    const userId = props.router.params.userId ? props.router.params.userId : authorizedUserId
    const isOwner = !props.router.params.userId

    const dispatch = useTypedDispatch()
    const savePhoto = (file: string) => dispatch(savePhotoThunkCreator(file))
    const updateStatus = (statusText: string) => dispatch(updateStatusThunkCreator(statusText))
    const updateProfileInfo = (newProfileInfo: ProfileType) => dispatch(updateProfileInfoThunkCreator(newProfileInfo))
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
            {/* <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div> */}
            <ProfileInfo
                updateProfileInfo={updateProfileInfo}
                isOwner={isOwner}
                status={status}
                updateStatus={updateStatus}
                profile={profile}
                savePhoto={savePhoto}
            />
            <MyPosts />
        </div >
    )
}

export default WithAuthRedirect(withRouter(Profile))