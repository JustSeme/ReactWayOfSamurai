import style from './Header.module.css'
import logo from '../../img/logo.svg'

function Header() {
    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>
        </header>
    )
}

export default Header;