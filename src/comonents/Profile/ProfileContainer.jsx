import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile, getUserStatus, updateStatus } from '../../redux/profileReducer'
import withRouter from '../HOC/WithRouter'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.router.params.userId ? this.props.router.params.userId : 25217
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

export default compose(
    connect(mapStateToProps, { getProfile, getUserStatus, updateStatus }),
    /* WithAuthRedirect */
    withRouter,
)(ProfileContainer)