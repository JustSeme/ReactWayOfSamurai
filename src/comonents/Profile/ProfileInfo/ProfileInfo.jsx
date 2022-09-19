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
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWIthHooks';

const ProfileInfo = ({ profile, status, updateStatus, ...props }) => {
    if (!profile) {
        return <MyPreloader />
    }

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
                <span>
                    <img src={facebookIcon} />
                    <a href={'https://' + profile.contacts.facebook}>{profile.contacts.facebook}</a>
                </span>
                <span>
                    <img src={gitHubIcon} />
                    <a href={'https://' + profile.contacts.github}>{profile.contacts.github}</a>
                </span>
                <span>
                    <img src={instagramIcon} />
                    <a href={'https://' + profile.contacts.instagram}>{profile.contacts.instagram}</a>
                </span>
                <span>
                    <img src={twitterIcon} />
                    <a href={profile.contacts.twitter}>{profile.contacts.twitter}</a>
                </span>
                <span>
                    <img src={vkIcon} />
                    <a href={'https://' + profile.contacts.vk}>{profile.contacts.vk}</a>
                </span>
                <span>
                    <img src={mainLinkIcon} />
                    <a href={'https://' + profile.contacts.mainLink}>{profile.contacts.mainLink}</a>
                </span>
                <span>
                    <img src={youtubeIcon} />
                    <a href={'https://' + profile.contacts.youtube}>{profile.contacts.youtube}</a>
                </span>
                <span>
                    <img src={websiteIcon} />
                    <a href={'https://' + profile.contacts.website}>{profile.contacts.website}</a>
                </span>
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