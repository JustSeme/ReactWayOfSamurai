import React from 'react';
import styles from '../ProfileInfo.module.css'

type PropsType = {
    savePhoto: (flie: string) => void
}

const UpdatePhotoInput: React.FC<PropsType> = ({ savePhoto, ...props }) => {

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
            <label className={styles.labelBtn} onClick={onLabelClick} htmlFor='filePhoto'>Загрузить новое фото</label>
        </div>
    );
};

export default UpdatePhotoInput;