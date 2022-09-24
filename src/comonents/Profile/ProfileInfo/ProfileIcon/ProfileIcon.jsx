import React from 'react';

const ProfileIcon = ({ iconSrc, href, ...props }) => {
    return (
        <span>
            <img src={iconSrc} />
            <a href={href}>{href}</a>
        </span>
    );
};

export default ProfileIcon;