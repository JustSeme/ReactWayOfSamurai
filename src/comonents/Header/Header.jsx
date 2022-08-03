import style from './Header.module.css'
import logo from '../../img/logo.svg'
import { NavLink } from 'react-router-dom';

function Header({ isAuth, login, ...props }) {
    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>

            <div className={style.loginBlock}>
                {isAuth ? <p>{login}</p> : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;