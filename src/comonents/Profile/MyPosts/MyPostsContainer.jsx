import MyPosts from './MyPosts';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    profilePage: state.profilePage
})

const mapDispatchToProps = dispatch => ({})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;