import MyButton from '../UI/MyButton/MyButton';
import noAvatar from '../../img/noAvatar.jpg'
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types';
import { AppStateType, useTypedDispatch } from '../../redux/redux-store';
import { followThunkCreator, unFollowThunkCreator } from '../../redux/userReducer';
import { useSelector } from 'react-redux';

type PropsType = {
    user: UserType
}

const User: React.FC<PropsType> = ({ user, ...props }) => {
    const dispatch = useTypedDispatch()

    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    const followingInProgress: Array<number> = useSelector((state: AppStateType) => state.usersPage.followingInProgress)

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