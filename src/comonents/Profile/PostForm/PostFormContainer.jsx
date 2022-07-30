import PostForm from './PostForm';
import { newPostActionCreator, onPostChangeActionCreator, onPostTitleChangeActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    profilePage: state.profilePage
})

const mapDispatchToProps = dispatch => ({
    onChangePostTitle: (text) => {
        dispatch(onPostTitleChangeActionCreator(text))
    },
    onChangePostText: (text) => {
        dispatch(onPostChangeActionCreator(text))
    },
    onCreatePost: () => {
        dispatch(newPostActionCreator())
    },
})

const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm)

export default PostFormContainer;