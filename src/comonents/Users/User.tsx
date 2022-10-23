import MyButton from '../UI/MyButton/MyButton';
import noAvatar from '../../img/noAvatar.jpg'
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>,
    follow: (userId: number) => void
    unFollow: (userId: number) => void

}

const User: React.FC<PropsType> = ({ user, followingInProgress, follow, unFollow, ...props }) => {
    return (
        <div className={styles.user}>
            <span className={styles.avatar}>
                <div>
                    <NavLink to={`/profile/` + user.id}>
                        <img alt='userPhoto' src={user.photos.small != null ? user.photos.small : noAvatar} className={styles.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <MyButton disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unFollow(user.id) }}
                        >Unfollow</MyButton>
                        : <MyButton disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}
                        >Follow</MyButton>}
                </div>
            </span>
            <span className={styles.userInfo}>
                <span>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.status}>{user.status}</div>
                </span>
            </span>
        </div>
    );
};

export default User;