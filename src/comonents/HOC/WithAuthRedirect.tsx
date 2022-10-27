import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store';

const AuthRedirect = (Component: React.FC<any> ) => {

    const mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
    })

    type RedirectPropsType = {
        isAuth: boolean
    }

    class RedirectComponent extends React.Component<RedirectPropsType> {

        render() {
            if (!this.props.isAuth) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
};

export default AuthRedirect;