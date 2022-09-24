import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile, getUserStatus, updateStatus, savePhoto, updateProfileInfo } from '../../redux/profileReducer'
import withRouter from '../HOC/WithRouter'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

    refreshProfile() {
        const userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.authorizedUserId
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.router.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.userId
})

export default compose(
    connect(mapStateToProps, { getProfile, getUserStatus, updateStatus, savePhoto, updateProfileInfo }),
    WithAuthRedirect,
    withRouter,
)(ProfileContainer)