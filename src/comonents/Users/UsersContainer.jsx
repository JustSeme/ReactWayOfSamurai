import React from 'react';
import Users from './Users';
import { connect } from 'react-redux'
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleFetching, unFollow } from '../../redux/userReducer';
import MyPreloader from '../UI/MyPreloader/MyPreloader';
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        this.props.toggleFetching()
        usersAPI.getUsers('this.props.currentPage, this.props.pageSize')
            .then(data => {
                this.props.toggleFetching()
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
        usersAPI.getUsers(page, this.props.pageSize)
            .then(data => this.props.setUsers(data.items))
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
            />
        </>
    }
}

const mapStateToProps = state => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

/* const mapDispatchToProps = dispatch => {
    return {
        follow: userId => {
            dispatch(followAC(userId))
        },
        unFollow: userId => {
            dispatch(unFollowAC(userId))
        },
        setUsers: users => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: page => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalUsersCount: totalCount => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleFetching: () => {
            dispatch(toggleFetching())
        }
    }
} */

export default UsersContainer = connect(mapStateToProps,
    { follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleFetching })(UsersContainer)