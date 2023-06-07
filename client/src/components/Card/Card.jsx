import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = (props) => {
  console.log(props);
  const renderId = () => {
    if (typeof props.id === 'number') {
      return props.id.toString();
    } else if (typeof props.id === 'string') {
      return props.id;
    }
    return '';
  };

  return (
    <div className={styles.Card}>
      <div className={styles.name}>{props.name}</div>
      <div>
        <img className={styles.img} src={props.image} />
      </div>
      <div className={styles.type}>
        <h4>Tipos</h4>
      {props.types?.map((type) => (
        <h5 className={styles.types} key={type.name ? type.name : type}>{type.name ? type.name : type}</h5>
        ))}
      </div>
      <Link to={`/detail/${renderId()}`}>      
        <button className={styles.buttonD}>Ver</button>      
      </Link>
    </div>
    
  );
};

export default Card;

