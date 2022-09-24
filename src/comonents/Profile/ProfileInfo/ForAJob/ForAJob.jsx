import React from 'react';
import lookingForAJob from '../../../../img/icons/lookingForAJob.jpg'
import notLookingForAJob from '../../../../img/icons/notLookingForAJob.png'

const ForAJob = ({ lookingForAJob, lookingForAJobDescription }) => {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>For a job:</p>
            <img src={lookingForAJob ? lookingForAJob : notLookingForAJob} />
            <p>{lookingForAJobDescription}</p>
        </div>
    );
};

export default ForAJob;