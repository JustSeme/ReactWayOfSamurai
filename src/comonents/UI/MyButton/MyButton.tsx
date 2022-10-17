import React from "react";
import style from './MyButton.module.css'

type PropsType = {
    children: string
    props?: any
    onClick?: () => void
    style?: any
    disabled?: boolean
    onChange?: (e: any) => void
    autoFocus?: boolean
    onBlur?: any
    placeholder?: string
}

const MyButton: React.FC<PropsType> = ({ children, ...props }) => {
    return (
        <button {...props} className={style.button}>{children}</button>
    )
}

export default MyButton