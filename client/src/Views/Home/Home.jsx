import CardContainer from "../../components/CardsContainer/CardsContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, searchPokemons, filterPokemonsByType, filterPokemonsByOrigin, orderByName, orderByAttack} from "../../redux/actions/actions";
import SearchBar from "../../components/SearchBar/searchBar"
import Paginado from "../../components/Paginado/paginado";
import styles from "../Home/Home.module.css"


const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons)
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [orden, setorden] = useState('');
    
  const currentPokemons = pokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [filteredPokemons]);

  const handleSearch = (searchName) => {
    if (searchName === "") {
      dispatch(getPokemons());
    } else {
      dispatch(searchPokemons(searchName));
    }
  };
  
  const handleTypeFilter = (event) => {
    const selectedType = event.target.value;
    dispatch(filterPokemonsByType(selectedType));
  };
  
  const handleOriginFilter = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(filterPokemonsByOrigin(selectedOrigin));
  };

  const handleOrderByName = (event)=>{
    const selectOrder = event.target.value;
    dispatch(orderByName(selectOrder))
    setCurrentPage(1);
    setorden(`Ordenado ${selectOrder}`)
  }

  const handleOrderByAttack = (event)=>{
    const selectAtack = event.target.value;
    dispatch(orderByAttack(selectAtack))
    setCurrentPage(1);
    setorden(`Ordenado ${selectAtack}`)
  }

   const handleClick = () => {
    dispatch(getPokemons());
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch}/>
        </div>
        <div className={styles.item}>
          <div className={styles.selectContainer}>            
            <select onChange={handleOrderByName}>
              <option value="asc"> A-Z </option>
              <option value="des"> Z-A </option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <select onChange={handleOrderByAttack}>
              <option value="max">Máximo</option>
              <option value="min">Mínimo</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <select onChange={handleOriginFilter}>
              <option value="All"> Todos </option>
              <option value="createdBd"> Creados </option>
              <option value="api"> Existentes </option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <select onChange={handleTypeFilter}>
              <option value="All"> Todos  </option>
              <option value="grass"> Grass </option>
              <option value="poison"> Poison </option>
              <option value="normal"> Normal </option>
              <option value="bug"> Bug </option>
              <option value="fighting"> Fighting </option>
              <option value="flying"> Flying </option>
              <option value="ground"> Ground </option>
              <option value="rock"> Rock </option>
              <option value="ghost"> Ghost </option>
              <option value="steel"> Steel </option>
              <option value="fire"> Fire </option>
              <option value="water"> Water </option>
              <option value="electric"> Electric </option>
              <option value="psychic"> Psychic </option>
              <option value="ice"> Ice </option>
              <option value="dragon"> Dragon </option>
              <option value="dark"> Dark </option>
              <option value="fairy"> Fairy </option>
              <option value="unknown"> Unknown </option>
              <option value="shadow"> Shadow </option>
            </select>
          </div>
        </div>
          <div className={styles.containerButton}>
           <button className={styles.button} onClick={handleClick}> Cargar todos </button>
         </div> 
      </div>
      <CardContainer
        currentPage={currentPage}
        pokemonsPerPage={pokemonsPerPage}        
        pokemons={filteredPokemons.length > 0 ? filteredPokemons : currentPokemons}
      />
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado={paginado}
      />
    </div>
  ); 
};

export default Home;
