import { Button } from "antd";
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
    htmlType?: 'button' | 'submit' | 'reset'
    size?: 'large' | 'middle' | 'small'
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
}

const MyButton: React.FC<PropsType> = ({ children, ...props }) => {
    return (
        <Button {...props} className={style.button}>{children}</Button>
    )
}

export default MyButton