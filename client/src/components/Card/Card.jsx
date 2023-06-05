// import style from './Card.module.css';

// const Card =(props)=>{
//     console.log(props)
//     return(
//         <div className={style.card}>
//             <img src={props.image} alt={props.name}/>
//             <h3>Name:{props.name}</h3>
//             <h4>Types: </h4>    
//             {props.types?.map((type)=>(
//                 <h5>{type.name?type.name:type}</h5>
//             ))}            
//         </div>
//     )  
// };


// export default Card;
// import style from './Card.module.css';
// import { Link } from "react-router-dom";

// const Card = (props) => {
//   console.log(props);
//   return (
//     <div className={style.card}>
//       <Link to={`/detail/${props.id}`}>
//         <img src={props.image} alt={props.name} />
//       </Link>
//       <h3>Name: {props.name}</h3>
//       <h4>Types: </h4>
//       {props.types?.map((type) => (
//         <h5 key={type.name ? type.name : type}>{type.name ? type.name : type}</h5>
//       ))}
//     </div>
//   );
// };

// export default Card;
import style from './Card.module.css';
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
    <div className={style.card}>
      <Link to={`/detail/${renderId()}`}>
        <img src={props.image} alt={props.name} />
      </Link>
      <h3>Name: {props.name}</h3>
      <h4>Types: </h4>
      {props.types?.map((type) => (
        <h5 key={type.name ? type.name : type}>{type.name ? type.name : type}</h5>
      ))}
    </div>
  );
};

export default Card;

