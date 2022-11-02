import React, { useEffect } from 'react';
import styles from './MyPaginator.module.css'

type PropsType = {
    currentPage: number
    onPageChanged: (page: number) => void
    totalUsersCount: number
    pageSize: number
}

const MyPaginator: React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: number[] = []

    
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let curP = currentPage;
    let curPF = ((curP - 7) < 0) ? 0 : curP - 7;
    let curPL = curP + 7;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            {slicedPages.map((page) => {
                return <span key={page} onClick={() => onPageChanged(page)} className={page === currentPage ? styles.pageNumber + ' ' + styles.selectedPage : styles.pageNumber}>{page}</span>
            })}
        </div>
    );
};

export default MyPaginator;