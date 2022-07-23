import React from 'react';
import MyButton from '../UI/button/MyButton';
import noAvatar from '../../img/noAvatar.jpg'
import styles from './Users.module.css'
import axios from 'axios';

class UsersClass extends React.Component {

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsers(response.data.items))
    }


    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {pages.map((page) => {
                        if (page > 10) return ''
                        return <span key={page} onClick={() => this.onPageChanged(page)} className={page === this.props.currentPage ? styles.selectedPage : ''}>{page}</span>
                    })}
                </div>
                {
                    this.props.usersData.map(user => <div key={user.id} className={styles.user}>
                        <span className={styles.avatar}>
                            <div><img src={user.photos.large != null ? user.photos.large : noAvatar} className={styles.userPhoto} /></div>
                            <div>{user.followed ? <MyButton onClick={() => this.props.unFollow(user.id)}>Unfollow</MyButton> : <MyButton onClick={() => this.props.follow(user.id)}>Follow</MyButton>}</div>
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
        )
    }
}

export default UsersClass;