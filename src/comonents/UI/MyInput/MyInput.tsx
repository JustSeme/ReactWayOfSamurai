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
    children?: React.ReactNode
}

const MyInput: React.FC<PropsType> = ({ input, meta, children, ...props }) => {
    const hasError = meta && meta.touched && (meta.error || meta.submitError)
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <input className={style.MyInput} {...input} {...props} />
            {children}
            {hasError && <span>{meta.error || meta.submitError}</span>}
        </div>
    );
};

export default MyInput;