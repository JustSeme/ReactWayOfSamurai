import React from 'react';
import style from './MyInput.module.css'

type PropsType = {
    input?: any
    meta?: any
    value?: string
    onChange?: (e: any) => void
    autoFocus?: boolean
    onBlur?: () => void
    placeholder?: string
}

const MyInput: React.FC<PropsType> = ({ input, meta, ...props }) => {
    const hasError = meta && meta.touched && (meta.error || meta.submitError)
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <input className={style.MyInput} {...input} {...props} />
            {hasError && <span>{meta.error || meta.submitError}</span>}
        </div>
    );
};

export default MyInput;