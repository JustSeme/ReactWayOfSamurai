import MyPosts from './MyPosts';
import { connect } from 'react-redux'

const mapStateToProps = (state: any) => ({
    postsData: state.profilePage.postsData
})

const MyPostsContainer = connect(mapStateToProps)(MyPosts)

export default MyPostsContainer;