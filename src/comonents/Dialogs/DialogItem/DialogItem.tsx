import React from 'react';
import { NavLink } from 'react-router-dom'
import style from './DialogItem.module.css'

type PropsType = {
    children: string
    id: number
}

const DialogItem: React.FC<PropsType> = ({ children, id }) => {
    const path = `/dialogs/${id}`

    return (
        <div className={style.dialog}>
            <NavLink to={path}>{children}</NavLink>
        </div>
    );
};

export default DialogItem;