import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from '../Detail/detail.module.css';

const Detail = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.detail);

  const renderTypes = () => {
    if (Array.isArray(myPokemon.types)) {
      // Si los tipos son un array de strings
      return myPokemon.types.map((type) => (
        <h5 className={styles.types} key={type}>
          {type}
        </h5>
      ));
    } else if (Array.isArray(myPokemon.Types) && myPokemon.Types.length > 0) {
      // Si los tipos son un array de objetos con propiedades id y name
      return myPokemon.Types.map((type) => (
        <h5 className={styles.types} key={type.id}>
          {type.name}
        </h5>
      ));
    }
    return null;
  };

  return (
    <>
      {Object.keys(myPokemon).length > 0 ? (
        <div>
          <div className={styles.container}>
            <Link to="/home">
              <button className={styles.buttonV}>Volver</button>
            </Link>

            <div className={styles.Card}>
              <h1 className={styles.name}>Soy {myPokemon.name}</h1>
              <img className={styles.img} src={myPokemon.image} alt={myPokemon.name} />
            </div>

            <div>
              <div className={styles.characteristics}>
                <div className={styles.characteristic}>
                  <span className={styles.label}>Vida:</span>
                  <div className={styles.bar}>
                    <div className={styles.progress} style={{ width: `${myPokemon.vida}%` }}></div>
                  </div>
                  <span className={styles.value}>{myPokemon.vida}</span>
                </div>

                <div className={styles.characteristic}>
                  <span className={styles.label}>Ataque:</span>
                  <div className={styles.bar}>
                    <div className={styles.progress} style={{ width: `${myPokemon.ataque}%` }}></div>
                  </div>
                  <span className={styles.value}>{myPokemon.ataque}</span>
                </div>

                <div className={styles.characteristic}>
                  <span className={styles.label}>Defensa:</span>
                  <div className={styles.bar}>
                    <div className={styles.progress} style={{ width: `${myPokemon.defensa}%` }}></div>
                  </div>
                  <span className={styles.value}>{myPokemon.defensa}</span>
                </div>

                <div className={styles.characteristic}>
                  <span className={styles.label}>Altura:</span>
                  <div className={styles.bar}>
                    <div className={styles.progress} style={{ width: `${myPokemon.altura}%` }}></div>
                  </div>
                  <span className={styles.value}>{myPokemon.altura}</span>
                </div>

                <div className={styles.characteristic}>
                  <span className={styles.label}>Peso:</span>
                  <div className={styles.bar}>
                    <div className={styles.progress} style={{ width: `${myPokemon.peso}%` }}></div>
                  </div>
                  <span className={styles.value}>{myPokemon.peso}</span>
                </div>
              </div>
              <p className={styles.type}>Tipo: {renderTypes()} </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Detail;

