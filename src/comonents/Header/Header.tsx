import style from './Header.module.css'
import logo from '../../img/logo.svg'
import { NavLink } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';
import { useSelector } from 'react-redux';
import { AppStateType, useTypedDispatch } from '../../redux/redux-store';
import { logoutActionCreator } from '../../redux/authReducer';

const Header: React.FC = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)

    const dispatch = useTypedDispatch()
    const logout = () => dispatch(logoutActionCreator())

    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>

            <div className={style.loginBlock}>
                {isAuth
                    ?
                    <span style={{ 'display': 'flex' }}>
                        <p className={style.userLogin}>{login}</p>
                        <MyButton
                            onClick={logout}
                            style={{ 'fontSize': '14px', 'padding': '0px 5px', 'maxHeight': '30px' }}
                        >Logout</MyButton>
                    </span>
                    :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;