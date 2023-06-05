import CardContainer from "../../components/CardsContainer/CardsContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, searchPokemons, filterPokemonsByType, filterPokemonsByOrigin, orderByName, orderByAttack} from "../../redux/actions/actions";
import SearchBar from "../../components/SearchBar/searchBar"
import Paginado from "../../components/Paginado/paginado";

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
    <>
      <h1> Home </h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <select onChange={handleOrderByName}>
          <option value="asc"> A-Z </option>
          <option value="des"> Z-A </option>
        </select>
        <select onChange={handleOrderByAttack}>
          <option value="max">Máximo</option>
          <option value="min">Mínimo</option>
        </select>
        <select onChange={handleOriginFilter}>
          <option value="All"> Todos </option>
          <option value="createdBd"> Creados </option>
          <option value="api"> Existentes </option>
        </select>
        <select onChange={handleTypeFilter}>
          <option value="All"> Todos  </option>
          <option value="grass"> Grass </option>
          <option value="poison"> Poison </option>
          <option value="bug"> Bug </option>
        </select>            
        <button onClick={handleClick}> Cargar todos los Pokemons </button>
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
    </>
  );
};

export default Home;