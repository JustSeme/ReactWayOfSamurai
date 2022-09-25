import React from 'react';
import styles from './MyModal.module.css'
import MyButton from '../MyButton/MyButton'
import ReactDOM from 'react-dom'

const MyModal = ({ show, onClose, children, title }) => {

    return ReactDOM.createPortal(
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
        </div>,
        document.getElementById('root')
    );
};

export default MyModal;