import React from 'react';
import lookingForAJobIcon from '../../../../img/icons/lookingForAJob.jpg'
import notLookingForAJobIcon from '../../../../img/icons/notLookingForAJob.png'

const ForAJob = ({ lookingForAJob, lookingForAJobDescription }) => {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>For a job:</p>
            <img src={lookingForAJob ? lookingForAJobIcon : notLookingForAJobIcon} />
            <div>
                <b>My professional skills: </b><br></br>{lookingForAJobDescription}
            </div>
        </div >
    );
};

export default ForAJob;