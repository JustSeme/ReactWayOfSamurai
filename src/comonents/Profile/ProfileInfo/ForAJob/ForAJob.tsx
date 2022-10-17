import React from 'react';
import lookingForAJobIcon from '../../../../img/icons/lookingForAJob.jpg'
import notLookingForAJobIcon from '../../../../img/icons/notLookingForAJob.png'
import style from '../ProfileInfo.module.css'

type PropsType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const ForAJob: React.FC<PropsType> = ({ lookingForAJob, lookingForAJobDescription }) => {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>For a job:</p>
            <img alt='lookingForAJob' src={lookingForAJob ? lookingForAJobIcon : notLookingForAJobIcon} />
            <div className={style.lookingForAJobDescription}>
                <b>My professional skills: </b>
                <div>
                    {lookingForAJobDescription}
                </div>
            </div>
        </div >
    );
};

export default ForAJob;