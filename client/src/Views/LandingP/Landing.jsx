import {Link} from 'react-router-dom'
import styles from '../LandingP/landingPage.module.css';



const Landing = ()=>{
    return (
        <div className={styles.container}>           
          <Link to='/home' className={styles.icon}>
            <div className={styles.home}>
              <h2 className={styles.text}> Home </h2>
              </div>           
          </Link>          
        </div>
    )
};

export default Landing;