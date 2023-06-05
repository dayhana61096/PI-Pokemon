import axios from 'axios';
import {
  FILTER_BY_TYPE,
  GET_POKEMONS,
  SEARCH_POKEMONS,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  GET_TYPES,
  GET_DETAIL
} from './types';

export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get('http://localhost:3001/pokemons');
    const pokemons = apiData.data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
    const pokemon = apiData.data;
    dispatch({ type: GET_DETAIL, payload: pokemon });
  };
};

export const getTypes = ()=>{
  return async function (dispatch){
    const info = await axios.get ('http://localhost:3001/types')
    return dispatch ({ type: GET_TYPES, payload: info.data});
  }
};

export const postPokemons = (payload)=>{
  return async function (dispatch){
    const response = await axios.post('http://localhost:3001/pokemons', payload);
    console.log(response)
    return response;
  }
};

export const searchPokemons = (searchName) => ({
  type: SEARCH_POKEMONS,
  payload: searchName,
});

export const filterPokemonsByType = (type) => ({
  type: FILTER_BY_TYPE,
  payload: type,
});

export const filterPokemonsByOrigin = (payload) => ({
  type: FILTER_BY_ORIGIN,
  payload,
});

export const orderByName = (payload) => ({
  type: ORDER_BY_NAME,
  payload,
});

export const orderByAttack = (payload) => ({
  type: ORDER_BY_ATTACK,
  payload,
});



