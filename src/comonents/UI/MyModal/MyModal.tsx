import React from 'react';
import styles from './MyModal.module.css'
import MyButton from '../MyButton/MyButton'

type PropsType = {
    show: boolean
    onClose: () => void
    children?: any
    title: string
}

const MyModal: React.FC<PropsType> = ({ show, onClose, children, title }) => {

    return (
        <div className={styles.modal + ` ${show ? styles.show : ''}`} onClick={onClose} >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>{title}</h4>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                <div className={styles.modalFooter}>
                    <MyButton onClick={onClose}>Close</MyButton>
                </div>
            </div>
        </div>
    );
};

export default MyModal;