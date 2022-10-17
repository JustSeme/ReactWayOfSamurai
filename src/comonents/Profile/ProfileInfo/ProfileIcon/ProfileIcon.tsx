import React from 'react';

type PropsType = {
    iconSrc: string
    href: string
}

const ProfileIcon: React.FC<PropsType> = ({ iconSrc, href }) => {
    return (
        <span>
            <img alt='icon' src={iconSrc} />
            <a href={href}>{href}</a>
        </span>
    );
};

export default ProfileIcon;