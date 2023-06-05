import {Link} from 'react-router-dom'
import style from './Navbar.module.css'

const Navbar = ()=>{
    return (
        <div className={style.navContainer}>
            <Link to='/home'>HOME</Link>
            <Link to='/create'> CREAR POKEMON </Link>
            <Link to='/'> Salir </Link>
            
        </div>
    )
};

export default Navbar;