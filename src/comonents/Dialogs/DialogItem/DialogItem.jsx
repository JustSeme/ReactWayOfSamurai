import React from 'react';
import { NavLink } from 'react-router-dom'
import style from './DialogItem.module.css'

const DialogItem = ({ children, id, ...props }) => {
    const path = `/dialogs/${id}`

    return (
        <div className={style.dialog}>
            <NavLink to={path}>{children}</NavLink>
        </div>
    );
};

export default DialogItem;