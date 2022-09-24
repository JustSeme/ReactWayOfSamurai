import React, { useEffect } from 'react';
import styles from './MyModal.module.css'
import MyButton from '../MyButton/MyButton'

const MyModal = ({ show, onClose, children, title }) => {
    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }
    }, [])

    function closeOnEscapeKeyDown(e) {
        if ((e.charCode || e.keyCode) === 27) onClose()
    }

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
        </div >
    );
};

export default MyModal;