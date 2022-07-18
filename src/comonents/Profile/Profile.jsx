import style from './Profile.module.css'
import wallpaper from '../../img/wallpaper.jpg'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import StoreContext from '../../StoreContext'
import MyPostsContainer from './MyPosts/MyPostsContainer'

function Profile({ ...props }) {
    return (
        <div>
            <div className={style.wallpaper}>
                <img src={wallpaper} />
            </div>
            <ProfileInfo />
            <MyPostsContainer />
        </div >
    )
}

export default Profile