import React from 'react';

const ProfileIcon = ({ iconSrc, href }) => {
    return (
        <span>
            <img src={iconSrc} />
            <a href={href}>{href}</a>
        </span>
    );
};

export default ProfileIcon;