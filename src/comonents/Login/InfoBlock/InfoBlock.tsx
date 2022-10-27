import React from 'react';
import style from './InfoBlock.module.css'

type PropsType = {
    visible: boolean
}

const InfoBlock:React.FC<PropsType> = ({ visible }) => {
    return (
        <div className={style.infoBlock + ` ${visible ? style.show : ''}`}>
            Для ознакомления с проектом можно использовать тестовый аккаунт:<br></br>
            Email: <i>semyn03@mail.ru</i><br></br>
            Password: <i>QWERTY123</i>
        </div>
    );
};

export default InfoBlock;