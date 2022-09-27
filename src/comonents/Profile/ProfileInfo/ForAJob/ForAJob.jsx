import React from 'react';
import lookingForAJobIcon from '../../../../img/icons/lookingForAJob.jpg'
import notLookingForAJobIcon from '../../../../img/icons/notLookingForAJob.png'

const ForAJob = ({ lookingForAJob, lookingForAJobDescription }) => {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>For a job:</p>
            <img src={lookingForAJob ? lookingForAJobIcon : notLookingForAJobIcon} />
            <p>{lookingForAJobDescription}</p>
        </div>
    );
};

export default ForAJob;