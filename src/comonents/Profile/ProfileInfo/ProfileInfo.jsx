import React, { useState } from 'react';
import MyPreloader from '../../UI/MyPreloader/MyPreloader';
import styles from './ProfileInfo.module.css'
import noAvatar from '../../../img/noAvatar.jpg'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWIthHooks';
import UpdatePhotoInput from './UpdatePhotoInput/UpdatePhotoInput';
import ForAJob from './ForAJob/ForAJob';
import Contacts from './Contacts/Contacts';
import MyModal from '../../UI/MyModal/MyModal'
import ProfileInfoForm from './ProfileInfoForm/ProfileInfoForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfileInfo }) => {
    const [show, setShow] = useState(false)

    if (!profile) {
        return <MyPreloader />
    }

    return (
        <div className={styles.profileWrapper}>
            <div>
                <img className={styles.profileAvatar} src={profile.photos.large || noAvatar} />
                <div className={styles.profileButtonsWrapper}>
                    {isOwner && <UpdatePhotoInput savePhoto={savePhoto} />}
                    <button onClick={() => setShow(true)} className={styles.labelBtn}>Редактировать профиль</button>
                </div>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{profile.fullName}</p>
                <p>{profile.aboutMe}</p>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                <MyModal title='Редактирование профиля' onClose={() => setShow(false)} show={show}>
                    <ProfileInfoForm profile={profile} updateProfileInfo={updateProfileInfo} />
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