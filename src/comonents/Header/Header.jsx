import style from './Header.module.css'
import logo from '../../img/logo.svg'
import { NavLink } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';

function Header({ isAuth, login, logout, ...props }) {
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