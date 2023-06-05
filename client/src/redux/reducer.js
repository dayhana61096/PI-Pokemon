import {
  FILTER_BY_TYPE,
  GET_POKEMONS,
  SEARCH_POKEMONS,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  POST_POKEMONS,
  GET_TYPES,
  GET_DETAIL,
} from './actions/types';

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  detail: [],
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      }  
    
    case POST_POKEMONS:
      return {...state};
    
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      };
      
    case SEARCH_POKEMONS:
      const filteredPokemons = state.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase() === action.payload.toLowerCase()
        );
         return {
          ...state,
          filteredPokemons,
        };    

    case FILTER_BY_TYPE:
      const pokemonByType = state.pokemons.filter((pokemon) => {
        return (
          pokemon.types &&
          Array.isArray(pokemon.types) &&
          pokemon.types.includes(action.payload)
        );
      });
      return {
        ...state,
        filteredPokemons: pokemonByType,
      };

    case FILTER_BY_ORIGIN:
      const allCreated = state.pokemons;
      const createdFilter =
        action.payload === 'createdBd'
          ? allCreated.filter((el) => el.createdBd)
          : allCreated.filter((el) => !el.createdBd);
      return {
        ...state,
        filteredPokemons:
          action.payload === 'All' ? state.pokemons : createdFilter,
      };

    case ORDER_BY_NAME:
      const sortedArr = state.filteredPokemons.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return action.payload === 'asc' ? 1 : -1;
        }
        if (nameB > nameA) {
          return action.payload === 'asc' ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        filteredPokemons: sortedArr,
      };

    case ORDER_BY_ATTACK:
      const sortedAttack = action.payload === 'min'
        ? state.filteredPokemons.sort((a, b) => parseInt(a.ataque) - parseInt(b.ataque))
        : state.filteredPokemons.sort((a, b) => parseInt(b.ataque) - parseInt(a.ataque));
      return {
        ...state,
        filteredPokemons: sortedAttack,
      };
    
      

    default:
      return state;
  }
};

export default rootReducer;

