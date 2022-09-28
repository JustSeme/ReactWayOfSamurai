import React from 'react';
import styles from '../ProfileInfo.module.css'
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import facebookIcon from '../../../../img/icons/facebook.jpg'
import gitHubIcon from '../../../../img/icons/github.jpg'
import instagramIcon from '../../../../img/icons/instagram.jpg'
import twitterIcon from '../../../../img/icons/twitter.png'
import vkIcon from '../../../../img/icons/vk.jpg'
import mainLinkIcon from '../../../../img/icons/mainLink.png'
import youtubeIcon from '../../../../img/icons/youtube.png'
import websiteIcon from '../../../../img/icons/website.png'

const Contacts = ({ contacts }) => {

    const icons = {
        facebook: facebookIcon,
        mainLink: mainLinkIcon,
        vk: vkIcon,
        twitter: twitterIcon,
        instagram: instagramIcon,
        youtube: youtubeIcon,
        github: gitHubIcon,
        website: websiteIcon
    }
    return (
        <div className={styles.contacts}>
            <p style={{ fontWeight: 'bold' }}>Contacts:</p>
            {Object.entries(contacts).map((contact, index) =>
                <ProfileIcon iconSrc={icons[contact[0]]} href={contact[1]} key={index} />)}
        </div>
    );
};

export default Contacts;