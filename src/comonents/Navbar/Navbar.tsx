import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/dialogs'>Dialogs</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/users'>Users</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;