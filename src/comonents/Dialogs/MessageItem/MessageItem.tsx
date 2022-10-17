import React from 'react';
import style from './MessageItem.module.css'

type PropsType = {children: string}

const MessageItem: React.FC<PropsType> = ({ children }) => {
    return (
        <div className={style.message}>{children}</div>
    );
};

export default MessageItem;