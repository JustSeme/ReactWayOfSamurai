import MyPosts from './MyPosts';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    postsData: state.profilePage.postsData
})

const MyPostsContainer = connect(mapStateToProps)(MyPosts)

export default MyPostsContainer;