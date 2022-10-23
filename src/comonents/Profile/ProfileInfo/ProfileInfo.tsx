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

    if (!profile) {
        return <MyPreloader />
    }

    return (
        <div className={styles.profileWrapper}>
            <div>
                <img alt='profile avatar' className={styles.profileAvatar} src={profile.photos.large || noAvatar} />
                <div className={styles.profileButtonsWrapper}>
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