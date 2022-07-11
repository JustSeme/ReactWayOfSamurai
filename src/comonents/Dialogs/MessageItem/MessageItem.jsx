import React from 'react';
import style from './MessageItem.module.css'

const MessageItem = ({ children, ...props }) => {
    return (
        <div className={style.message}>{children}</div>
    );
};

export default MessageItem;