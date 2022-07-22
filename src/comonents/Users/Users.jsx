import React from 'react';
import MyButton from '../UI/button/MyButton';
import noAvatar from '../../img/noAvatar.jpg'
import styles from './Users.module.css'
import veronika from '../../img/avatar.png'

const Users = ({ usersData, follow, unFollow, setUsers, ...props }) => {
    if (usersData.length === 0) {
        setUsers([{ id: 1, fullName: 'Dmitriy K', followed: false, status: 'Hey! I am fine!', location: { country: 'Belarus', city: 'Gomel' } },
        { id: 2, fullName: 'Semion M', followed: true, status: 'I am just training...', location: { country: 'Russia', city: 'Krasnodar' } },
        { id: 3, fullName: 'Nikita C', followed: false, status: 'Yo!', location: { country: 'Ukraina', city: 'Kharkov' } },
        { id: 4, avatar: veronika, fullName: 'Veronika K', followed: true, status: 'Hello from Australia', location: { country: 'Australia', city: 'Sidney' } }])
    }

    return (
        <div>
            {
                usersData.map(user => <div key={user.id}>
                    <span>
                        <div><img src={user.avatar ? user.avatar : noAvatar} className={styles.userPhoto} /></div>
                        <div>{user.followed ? <MyButton onClick={() => unFollow(user.id)}>Unfollow</MyButton> : <MyButton onClick={() => follow(user.id)}>Follow</MyButton>}</div>
                    </span>
                    <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;