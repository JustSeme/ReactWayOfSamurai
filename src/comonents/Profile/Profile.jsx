import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

function Profile({ profile, status, updateStatus, ...props }) {
    return (
        <div>
            {/* <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div> */}
            <ProfileInfo status={status} updateStatus={updateStatus} profile={profile} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile