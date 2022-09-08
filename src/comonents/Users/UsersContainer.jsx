import React from 'react';
import Users from './Users';
import { connect } from 'react-redux'
import { acceptFollow, setCurrentPage, acceptUnfollow, toggleFollowing, getUsers, follow, unFollow } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
        this.props.getUsers(page, this.props.pageSize)
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

/* const mapStateToProps = state => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
} */

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