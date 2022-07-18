import React from 'react';
import StoreContext from '../../../StoreContext';
import MyPosts from './MyPosts';

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => (
                <MyPosts profilePage={store.getState().profilePage} />
            )}
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer;