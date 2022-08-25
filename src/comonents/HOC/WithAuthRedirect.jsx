import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux'

const AuthRedirect = (Component) => {

    const mapStateToPropsForRedirect = (state) => ({
        isAuth: state.auth.isAuth,
    })

    class RedirectComponent extends React.Component {

        render() {
            if (!this.props.isAuth) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
};

export default AuthRedirect;