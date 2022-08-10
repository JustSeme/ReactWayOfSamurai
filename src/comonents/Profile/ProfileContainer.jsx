import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import withRouter from '../HOC/WithRouter'

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.router.params.userId ? this.props.router.params.userId : 10
        this.props.getProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { getProfile })(WithUrlDataContainerComponent)