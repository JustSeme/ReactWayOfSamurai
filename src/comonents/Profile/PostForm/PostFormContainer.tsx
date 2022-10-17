import PostForm from './PostForm';
import { newPostActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux'

const PostFormContainer = connect(null, {onCreatePost: newPostActionCreator})(PostForm)

export default PostFormContainer;