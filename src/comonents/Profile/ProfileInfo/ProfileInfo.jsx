import React from 'react';
import MyPreloader from '../../UI/MyPreloader/MyPreloader';
import styles from './ProfileInfo.module.css'
import facebookIcon from '../../../img/icons/facebook.jpg'
import gitHubIcon from '../../../img/icons/github.jpg'
import instagramIcon from '../../../img/icons/instagram.jpg'
import twitterIcon from '../../../img/icons/twitter.png'
import vkIcon from '../../../img/icons/vk.jpg'
import mainLinkIcon from '../../../img/icons/mainLink.png'
import youtubeIcon from '../../../img/icons/youtube.png'
import websiteIcon from '../../../img/icons/website.png'
import lookingForAJob from '../../../img/icons/lookingForAJob.jpg'
import notLookingForAJob from '../../../img/icons/notLookingForAJob.png'
import noAvatar from '../../../img/noAvatar.jpg'
import ProfileStatusWithHooks from './ProfileStatusWIthHooks';
import ProfileIcon from './ProfileIcon';

const ProfileInfo = ({ profile, status, updateStatus, ...props }) => {
    if (!profile) {
        return <MyPreloader />
    }
    const icons = [facebookIcon, gitHubIcon, instagramIcon, twitterIcon, vkIcon, mainLinkIcon, youtubeIcon, websiteIcon]

    return (
        <div className={styles.profileWrapper}>
            <div>
                <img className={styles.profileAvatar} src={profile.photos.large ? profile.photos.large : noAvatar} />
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{profile.fullName}</p>
                <p>{profile.aboutMe}</p>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
            <div className={styles.contacts}>
                <p style={{ fontWeight: 'bold' }}>Contacts:</p>
                {Object.entries(profile.contacts).map((contact, index) =>
                    <ProfileIcon iconSrc={icons[index]} href={contact[1]} key={index} />)}
            </div>
            <div>
                <p style={{ fontWeight: 'bold' }}>For a job:</p>
                <img src={profile.lookingForAJob ? lookingForAJob : notLookingForAJob} />
                <p>{profile.lookingForAJobDescription}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;