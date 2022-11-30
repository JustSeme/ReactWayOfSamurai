import { Button } from 'antd';
import React from 'react';
import { savePhotoThunkCreator } from '../../../../redux/profileReducer';
import { useTypedDispatch } from '../../../../redux/redux-store';
import styles from '../ProfileInfo.module.css'

const UpdatePhotoInput: React.FC = (props) => {
    const dispatch = useTypedDispatch()
    const savePhoto = (file: string) => dispatch(savePhotoThunkCreator(file))

    const onPhotoChanged = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onLabelClick = () => {
        const inputFileNode = document.getElementById('filePhoto')
        inputFileNode && inputFileNode.click()
    }

    return (
        <div className={styles.inputWrapper}>
            <input type='file' id='filePhoto' name='filePhoto' className={styles.fileInput}
                accept="image/png, image/gif, image/jpeg" onChange={onPhotoChanged} />
            <Button className={styles.labelBtn} onClick={onLabelClick}>Загрузить новое фото</Button>
        </div>
    );
};

export default UpdatePhotoInput;