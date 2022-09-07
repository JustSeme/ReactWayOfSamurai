import React from 'react';
import styles from './MyTextarea.module.css'

const MyTextarea = ({ input, meta, ...props }) => {
    const hasError = meta && meta.touched && (meta.error || meta.submitError)
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error || meta.submitError}</span>}
        </div>
    );
};

export default MyTextarea;