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
import { ProfileType } from '../../../types/types';
import { AppStateType, useTypedDispatch } from '../../../redux/redux-store';
import { getIsFollowThunkCreator } from '../../../redux/profileReducer';
import { followThunkCreator, unFollowThunkCreator } from '../../../redux/userReducer';
import { useSelector } from 'react-redux';

type PropsProfileInfoType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean

    savePhoto: (flie: string) => void
    updateStatus: (statusText: string) => void
    updateProfileInfo: (newProfileInfo: ProfileType) => void
}

const ProfileInfo: React.FC<PropsProfileInfoType> = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfileInfo }) => {
    const [show, setShow] = useState(false)
    const dispatch = useTypedDispatch()
    
    const isFollow = useSelector((state: AppStateType) => state.profilePage.isFollow)
    const followingInProgress = useSelector((state: AppStateType) => state.usersPage.followingInProgress)
    /* функции follow и unFollow находятся в userReducer, в то время как значение  isFollow - в profileReducer. Массив followingInProgress добавлен чтобы делать ререндер */

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

    return (
        <div className={styles.profileWrapper}>
            <div>
                <img alt='profile avatar' className={styles.profileAvatar} src={profile.photos.large || noAvatar} />
                <div className={styles.profileButtonsWrapper}>
                    {/* {!isOwner && <button className={styles.labelBtn}>{isFollow ? 'Отписаться' : 'Подписаться'}</button>} */}
                    {!isOwner && subscribeBtn}
                    {isOwner && <UpdatePhotoInput savePhoto={savePhoto} />}
                    {isOwner && <button onClick={() => setShow(true)} className={styles.labelBtn}>Редактировать профиль</button>}
                </div>
                <div>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{profile.fullName}</p>
                </div>
                <div>
                    <b>About Me: </b>{profile.aboutMe}
                </div>
                <ProfileStatus status={status} updateStatus={updateStatus} />
                <MyModal title='Редактирование профиля' onClose={() => setShow(false)} show={show}>
                    <ProfileInfoForm onClose={() => setShow(false)} profile={profile} updateProfileInfo={updateProfileInfo} />
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