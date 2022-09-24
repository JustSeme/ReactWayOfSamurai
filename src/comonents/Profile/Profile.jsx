import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

function Profile({ profile, status, updateStatus, isOwner, savePhoto, ...props }) {
    return (
        <div>
            {/* <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div> */}
            <ProfileInfo
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