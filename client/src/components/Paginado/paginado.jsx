import React from "react";
import styles from '../Paginado/paginado.module.css';

export default function Paginado({ pokemonsPerPage, pokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.paginacion} >
        {pageNumbers.map((number) => (
          <li className={styles.number} key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}













// import React from "react";

// export default function Paginado ({pokemonsPerPage, pokemons, paginado}){
    
//     const pageNumbers = [];

//     for(let i=0; i<= Math.ceil(pokemons/pokemonsPerPage); i++){
//         pageNumbers.push(i)
//     };

//     return (
//         <nav>
//             <ul className="paginado">
//                 {pageNumbers && pageNumbers.map(number=>{
//                     <li className="number" key={number}>
//                     <a onClick={()=>paginado(number)}>{number}</a>
//                     </li>
//                     })}                    
//             </ul>
//         </nav>
//     )
// };