import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import styles from './MyTextarea.module.css'

type PropsType = {
    input: any
    meta: any
    cols?: string
    rows?: string
    placeholder?: string
}

const MyTextarea: React.FC<PropsType> = ({ input, meta, ...props }) => {
    const hasError = meta && meta.touched && (meta.error || meta.submitError)
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <TextArea {...input} {...props} />
            {hasError && <span>{meta.error || meta.submitError}</span>}
        </div>
    );
};

export default MyTextarea;