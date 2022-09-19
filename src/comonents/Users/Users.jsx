import React from 'react';
import MyPaginator from '../UI/MyPaginator/MyPaginator';
import User from './User';

const Users = (props) => {

    return (
        <div>
            <MyPaginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} />
            {
                props.usersData.map(user =>
                    <User user={user}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unFollow={props.unFollow}
                        key={user.id}
                    />)
            }
        </div>
    );
};

export default Users;