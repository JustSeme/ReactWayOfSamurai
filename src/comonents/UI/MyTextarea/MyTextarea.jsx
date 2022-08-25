import React from 'react';
import styles from './MyTextarea.module.css'

const MyTextarea = ({ input, meta, ...props }) => {
    const hasError = meta && meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export default MyTextarea;