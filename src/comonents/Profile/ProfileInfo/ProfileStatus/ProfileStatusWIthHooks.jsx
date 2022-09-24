import React from 'react';
import { useState, useEffect } from 'react';
import MyInput from '../../../UI/MyInput/MyInput';
import styles from '../ProfileInfo.module.css'

const ProfileStatusWithHooks = ({ status, updateStatus, ...props }) => {
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

    return (
        <div>
            {
                !editMode
                    ? <div className={styles.status}>
                        <span onClick={activateEditMode}>{status || 'Введите статус... '}</span>
                    </div>
                    : <div>
                        <MyInput value={statusText} onChange={e => setStatusText(e.target.value)} autoFocus={true} onBlur={deActivateEditMode} placeholder='Введите статус...' />
                    </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;