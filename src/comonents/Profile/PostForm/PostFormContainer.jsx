import PostForm from './PostForm';
import { newPostActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    profilePage: state.profilePage
})

const mapDispatchToProps = dispatch => ({
    onCreatePost: (newPostText, newPostTitleText) => {
        dispatch(newPostActionCreator(newPostText, newPostTitleText))
    },
})

const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm)

export default PostFormContainer;