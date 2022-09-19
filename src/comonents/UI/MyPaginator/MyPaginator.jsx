import React from 'react';
import styles from './MyPaginator.module.css'

const Paginator = ({ currentPage, onPageChanged, totalUsersCount, pageSize, props }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let curP = currentPage;
    let curPF = ((curP - 3) < 0) ? 0 : curP - 3;
    let curPL = curP + 2;
    let slicedPages = pages.slice(curPF, curPL);
    return (
        <div>
            {slicedPages.map((page) => {
                return <span key={page} onClick={() => onPageChanged(page)} className={page === currentPage ? styles.pageNumber + ' ' + styles.selectedPage : styles.pageNumber}>{page}</span>
            })}
        </div>
    );
};

export default Paginator;