import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const HeaderContainer: React.FC<PropsType> = (props) => {
    return <Header {...props} />
}


const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect(mapStateToProps, { logout })(HeaderContainer)