import styles from './Navbar.module.css'

const Navbar = () => {
    return (
      <ul className={styles.navContainer}>
        <li className={styles.li}><a className={styles.lia}  href="/home">Home</a></li>
        <li className={styles.li}><a className={styles.lia} href="/create">Crea Tu Pokemón</a></li>
        <li className={styles.li}><a className={styles.lia} href="/">Salir</a></li>
      </ul>
      
    );
  };

export default Navbar;