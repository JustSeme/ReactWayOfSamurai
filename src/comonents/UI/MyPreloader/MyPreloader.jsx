import React from 'react';
import preloader from '../../../img/preloader.gif'
import styles from './MyPreloader.module.css'

const MyPreloader = () => {
    return (
        <img className={styles.preloader} src={preloader} />
    );
};

export default MyPreloader;