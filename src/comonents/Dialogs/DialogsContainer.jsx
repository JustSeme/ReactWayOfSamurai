import Dialogs from './Dialogs'
import { newMessageActionCreator } from '../../redux/dialogsReducer.ts'
import { connect } from 'react-redux'
import WithAuthRedirect from '../HOC/WithAuthRedirect'
import { compose } from 'redux'

const mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newMessage: (newMessageText) => {
            dispatch(newMessageActionCreator(newMessageText))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs)