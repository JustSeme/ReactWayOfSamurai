import React, { useState } from 'react';
import MyPreloader from '../../UI/MyPreloader/MyPreloader';
import styles from './ProfileInfo.module.css'
import noAvatar from '../../../img/noAvatar.jpg'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import UpdatePhotoInput from './UpdatePhotoInput/UpdatePhotoInput';
import ForAJob from './ForAJob/ForAJob';
import Contacts from './Contacts/Contacts';
import MyModal from '../../UI/MyModal/MyModal'
import ProfileInfoForm from './ProfileInfoForm/ProfileInfoForm';
import { AppStateType, useTypedDispatch } from '../../../redux/redux-store';
import { getIsFollowThunkCreator } from '../../../redux/profileReducer';
import { followThunkCreator, unFollowThunkCreator } from '../../../redux/userReducer';
import { useSelector } from 'react-redux';
import { getFollowingInProgress } from '../../../redux/selectors/usersSelectors';
import { Button } from 'antd';

type PropsProfileInfoType = {
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsProfileInfoType> = ({ isOwner }) => {
    const [show, setShow] = useState(false)
    const dispatch = useTypedDispatch()
    
    const isFollow = useSelector((state: AppStateType) => state.profilePage.isFollow)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const followingInProgress = useSelector(getFollowingInProgress)
    /* функции follow и unFollow находятся в userReducer, в то время как значение  isFollow - в profileReducer. Массив followingInProgress добавлен чтобы компонент перерендеривался */

    if (!profile) {
        return <MyPreloader />
    }

    const getIsFollow = (userId: number) => dispatch(getIsFollowThunkCreator(userId))
    const follow = (userId: number) => dispatch(followThunkCreator(userId))
    const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId))

    if(!isOwner) {
        getIsFollow(profile.userId)
    }

    let subscribeBtn
    if(isFollow) {
        subscribeBtn = <button className={styles.labelBtn} onClick={() => unFollow(profile.userId)}>Отписаться</button>
    } else {
        subscribeBtn = <button className={styles.labelBtn} onClick={() => follow(profile.userId)}>Подписаться</button>
    }

    console.log(profile);
    


    return (
        <div className={styles.profileWrapper}>
            <div>
                <img alt='profile avatar' className={styles.profileAvatar} src={profile.photos.large || noAvatar} />
                <div className={styles.profileButtonsWrapper}>
                    {!isOwner && subscribeBtn}
                    {isOwner && <UpdatePhotoInput />}
                    {isOwner && <Button onClick={ () => setShow(true) } className={styles.labelBtn}>Редактировать профиль</Button>}
                </div>
                <div>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{profile.fullName}</p>
                </div>
                <div>
                    <b>About Me: </b>{profile.aboutMe}
                </div>
                <ProfileStatus isOwner={isOwner} />
                <MyModal title='Редактирование профиля' onClose={() => setShow(false)} show={show}>
                    <ProfileInfoForm onClose={() => setShow(false)} profile={profile} />
                </MyModal>
            </div>
            <Contacts contacts={profile.contacts} />
            <ForAJob
                lookingForAJob={profile.lookingForAJob}
                lookingForAJobDescription={profile.lookingForAJobDescription}
            />
        </div>
    );
};

export default ProfileInfo;