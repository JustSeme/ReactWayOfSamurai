import React from 'react';
import Users from './Users';
import { connect } from 'react-redux'
import { acceptFollow, setCurrentPage, acceptUnfollow, toggleFollowing, getUsers, follow, unFollow } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector, } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        let { currentPage, pageSize } = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (page) => {
        const { pageSize } = this.props
        this.props.setCurrentPage(page)
        this.props.getUsers(page, pageSize)
    }


    render() {
        return <>
            {this.props.isFetching ? <MyPreloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                usersData={this.props.usersData}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = state => {
    return {
        usersData: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default UsersContainer = connect(mapStateToProps,
    {
        acceptFollow, acceptUnfollow, setCurrentPage,
        toggleFollowing, getUsers, follow, unFollow
    })(UsersContainer)