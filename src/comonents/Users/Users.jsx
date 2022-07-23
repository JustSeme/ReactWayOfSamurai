import React from 'react';
import MyButton from '../UI/button/MyButton';
import noAvatar from '../../img/noAvatar.jpg'
import styles from './Users.module.css'
import axios from 'axios';

const Users = ({ usersData, follow, unFollow, setUsers, ...props }) => {
    if (usersData.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => setUsers(response.data.items))
        /* setUsers([{ id: 1, name: 'Dmitriy K', followed: false, status: 'Hey! I am fine!', location: { country: 'Belarus', city: 'Gomel' } },
        { id: 2, name: 'Semion M', followed: true, status: 'I am just training...', location: { country: 'Russia', city: 'Krasnodar' } },
        { id: 3, name: 'Nikita C', followed: false, status: 'Yo!', location: { country: 'Ukraina', city: 'Kharkov' } },
        { id: 4, avatar: veronika, name: 'Veronika K', followed: true, status: 'Hello from Australia', location: { country: 'Australia', city: 'Sidney' } }]) */
    }

    return (
        <div>
            {
                usersData.map(user => <div key={user.id} className={styles.user}>
                    <span className={styles.avatar}>
                        <div><img src={user.avatar ? user.avatar : noAvatar} className={styles.userPhoto} /></div>
                        <div>{user.followed ? <MyButton onClick={() => unFollow(user.id)}>Unfollow</MyButton> : <MyButton onClick={() => follow(user.id)}>Follow</MyButton>}</div>
                    </span>
                    <span className={styles.userInfo}>
                        <span>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.status}>{user.status}</div>
                        </span>
                        <span className={styles.locationInfo}>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;