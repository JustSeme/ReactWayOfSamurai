import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileType } from '../../types/types'

export type PropsProfileType = {
    profile: ProfileType
    status: string
    updateStatus: () => void
    isOwner: boolean
    savePhoto: (flie: string) => void
    updateProfileInfo: (newProfileInfo: ProfileType) => void
}

const Profile: React.FC<PropsProfileType> = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfileInfo }) => {
    

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
            <MyPostsContainer />
        </div >
    )
}

export default Profile