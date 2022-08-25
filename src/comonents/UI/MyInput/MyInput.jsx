import React from 'react';
import style from './MyInput.module.css'

const MyInput = ({ input, meta, ...props }) => {
    const hasError = meta && meta.touched && meta.error
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <input className={style.MyInput} {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export default MyInput;