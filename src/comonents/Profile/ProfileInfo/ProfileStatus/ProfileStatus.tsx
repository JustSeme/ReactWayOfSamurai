import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { updateStatusThunkCreator } from '../../../../redux/profileReducer';
import { AppStateType, useTypedDispatch } from '../../../../redux/redux-store';
import MyInput from '../../../UI/MyInput/MyInput';
import styles from '../ProfileInfo.module.css'

type PropsType = {
    isOwner: boolean
}

const ProfileStatus: React.FC<PropsType> = ({ isOwner }) => {
    const status = useSelector((state: AppStateType) => state.profilePage.status)

    const dispatch = useTypedDispatch()
    const updateStatus = (statusText: string) => dispatch(updateStatusThunkCreator(statusText))

    const [editMode, setEditMode] = useState(false)
    const [statusText, setStatusText] = useState(status)

    useEffect(() => {
        setStatusText(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        updateStatus(statusText)
    }
    
    let statusSpanNode
    if(isOwner) {
        statusSpanNode = <span onClick={activateEditMode}><b>Status: </b>{status || 'Введите статус... '}</span>
    } else {
        statusSpanNode = <span><b>Status: </b>{status || 'Статус отсутствует...'}</span>
    }

    return (
        <div>
            {
                !editMode
                    ? <div className={styles.status}>
                        {statusSpanNode}
                    </div>
                    : <div>
                        <MyInput
                            value={statusText}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setStatusText(e.target.value)}
                            autoFocus={true}
                            onBlur={deActivateEditMode}
                            placeholder='Введите статус...' />
                    </div>
            }
        </div>
    );
};

export default ProfileStatus;