import React from 'react';
import MyInput from '../../../UI/MyInput/MyInput';
import styles from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        statusText: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.statusText)
    }

    onStatusChange = (e) => {
        this.setState({
            statusText: e.target.value
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                statusText: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode
                        ? <div className={styles.status}>
                            <span onClick={this.activateEditMode}>{this.props.status || 'Введите статус... '}</span>
                        </div>
                        : <div>
                            <MyInput autoFocus={true} onBlur={this.deActivateEditMode} onChange={this.onStatusChange} placeholder='Введите статус...' value={this.state.statusText} />
                        </div>
                }
            </div>
        );
    }
};

export default ProfileStatus;