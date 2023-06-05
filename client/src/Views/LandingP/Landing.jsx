import {Link} from 'react-router-dom'
import styles from '../LandingP/landingPage.module.css';



const Landing = ()=>{
    return (
        <div className={styles.container}> 
          <h1 className={styles.title}>PokeWorld</h1>
          <Link to='/home' className={styles.button}>            
          </Link> 
        </div>
    )
};

export default Landing;