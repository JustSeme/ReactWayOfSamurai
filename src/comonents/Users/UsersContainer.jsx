import Users from './Users';
import { connect } from 'react-redux'
import { followAC, setUsersAC, unFollowAC } from '../../redux/userReducer';

const mapStateToProps = state => {
    return {
        usersData: state.usersPage.usersData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        follow: userId => {
            dispatch(followAC(userId))
        },
        unFollow: userId => {
            dispatch(unFollowAC(userId))
        },
        setUsers: users => {
            dispatch(setUsersAC(users))
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;