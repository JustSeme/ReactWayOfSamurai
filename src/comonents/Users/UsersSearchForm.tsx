import React, { ChangeEvent } from 'react';
import MyInput from '../UI/MyInput/MyInput';
import style from './Users.module.css'

type PropsType = { 
    searchedName: string
    isFriendsOnly: boolean

    setSearchedName: (value: string) => void
    setIsFriendsOnly: (value: boolean) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ searchedName, isFriendsOnly, setSearchedName, setIsFriendsOnly }) => {
    
    return (
        <div style={{'display': 'inlineBlock'}}>
            <MyInput autoFocus onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchedName(e.target.value)} value={searchedName} placeholder='Введите имя...' />
            <span className={style.checkboxText}>Отображать только друзей</span>
            <input className={style.friendsCheckbox} type="checkbox" checked={isFriendsOnly} onChange={() => setIsFriendsOnly(!isFriendsOnly)} />
        </div>
    );
})

export default UsersSearchForm;