import { useState, useEffect, ChangeEvent } from 'react';
import MyInput from '../../../UI/MyInput/MyInput';
import styles from '../ProfileInfo.module.css'

type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (statusText: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ status, updateStatus, isOwner }) => {
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