import style from './Profile.module.css'
import wallpaper from '../../img/wallpaper.jpg'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

function Profile({ profilePage, dispatch, ...props }) {
    return (
        <div>
            <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div>
            <ProfileInfo />
            <MyPosts profilePage={profilePage} dispatch={dispatch} />
        </div>
    )
}

export default Profile