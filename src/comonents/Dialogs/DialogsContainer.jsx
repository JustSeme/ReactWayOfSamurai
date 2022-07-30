import Dialogs from './Dialogs'
import { onMessageChangeActionCreator, newMessageActionCreator } from '../../redux/dialogsReducer'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMessageChange: (text) => {
            dispatch(onMessageChangeActionCreator(text))
        },
        newMessage: () => {
            dispatch(newMessageActionCreator())
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer