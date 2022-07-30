import style from './Profile.module.css'
import wallpaper from '../../img/wallpaper.jpg'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

function Profile({ profile, ...props }) {

    return (
        <div>
            <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div>
            <ProfileInfo profile={profile} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile