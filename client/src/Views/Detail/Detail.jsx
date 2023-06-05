import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.detail);

  const renderTypes = () => {
    if (Array.isArray(myPokemon.types)) {
      // Si los tipos son un array de strings
      return myPokemon.types.map((type) => <h5 key={type}>{type}</h5>);
    } else if (Array.isArray(myPokemon.types) && myPokemon.types.length > 0) {
      // Si los tipos son un array de objetos con propiedades id y name
      return myPokemon.types.map((type) => <h5 key={type.id}>{type.name}</h5>);
    }
    return null;
  };

  return (
    <>
      {Object.keys(myPokemon).length > 0 ? (
        <div>
          <h1>Soy {myPokemon.name}</h1>
          <img src={myPokemon.image} alt={myPokemon.name} />
          <h2>Vida: {myPokemon.vida}</h2>
          <h2>Ataque: {myPokemon.ataque}</h2>
          <h2>Defensa: {myPokemon.defensa}</h2>
          <h2>Velocidad: {myPokemon.velocidad}</h2>
          <h2>Altura: {myPokemon.altura}</h2>
          <h2>Peso: {myPokemon.peso}</h2>
          <h2>Tipos: {renderTypes()}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </>
  );
};

export default Detail;
