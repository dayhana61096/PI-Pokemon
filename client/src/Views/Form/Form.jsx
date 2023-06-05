import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postPokemons, getTypes } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const validate = (form) => {
  const errors = {};

  if (!form.name) {
    errors.name = "Se requiere un nombre";
  } else {
    // Validación para el campo "nombre": solo letras permitidas
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(form.name)) {
      errors.name = "El nombre solo puede contener letras.";
    }
  }

  if (!form.vida) {
    errors.vida = "Vida debe ser completado";
  }

  if (form.ataque > 130) {
    errors.ataque = "El nivel de ataque debe ser igual o inferior a 130";
  }

  return errors;
};

const imageOptions = [
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/200.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/300.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/400.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png",
];

export default function CreatedPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    image: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    types: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
    console.log(form);
  };

  const handleSelect = (e) => {
    const typeName = e.target.value;
    setForm({
      ...form,
      types: [...form.types, typeName],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const newErrors = validate(form);

    if (Object.keys(newErrors).length === 0 && form.name && form.vida) {
      dispatch(postPokemons(form));
      alert("¡Pokemon Creado!");
      setForm({
        name: "",
        image: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        types: [],
      });
      history.push("/home");
    } else {
      setErrors(newErrors);
    }
  };

  const handleClear = () => {
    setForm({
      name: "",
      image: "",
      vida: "",
      ataque: "",
      defensa: "",
      velocidad: "",
      altura: "",
      peso: "",
      types: [],
    });
    setErrors({});
  };

  const handleImageSelect = (e) => {
    const selectedIndex = e.target.value;
    const selectedImage = imageOptions[selectedIndex];
    setForm({
      ...form,
      image: selectedImage,
    });
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const isFormValid =
    Object.keys(errors).length === 0 && form.name && form.vida;

  return (
    <div>
      <h1>Crea Tu Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Imagen:</label>
          <select onChange={handleImageSelect}>
            {imageOptions.map((option, index) => (
              <option value={index} key={index}>
                {`Imagen ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Vida:</label>
          <input
            type="number"
            value={form.vida}
            onChange={handleChange}
            name="vida"
          />
          {errors.vida && <p className="error">{errors.vida}</p>}
        </div>

        <div>
          <label>Ataque:</label>
          <input
            type="number"
            value={form.ataque}
            onChange={handleChange}
            name="ataque"
          />
          {errors.ataque && <p className="error">{errors.ataque}</p>}
        </div>

        <div>
          <label>Defensa:</label>
          <input
            type="number"
            value={form.defensa}
            onChange={handleChange}
            name="defensa"
          />
        </div>

        <div>
          <label>Velocidad:</label>
          <input
            type="number"
            value={form.velocidad}
            onChange={handleChange}
            name="velocidad"
          />
        </div>

        <div>
          <label>Altura:</label>
          <input
            type="number"
            value={form.altura}
            onChange={handleChange}
            name="altura"
          />
        </div>

        <div>
          <label>Peso:</label>
          <input
            type="number"
            value={form.peso}
            onChange={handleChange}
            name="peso"
          />
        </div>

        <div>
          <label>Tipo:</label>
        </div>
        <select onChange={handleSelect}>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <ul>
          <li>{form.types.map((el) => el + ", ")}</li>
        </ul>
        <button type="submit" disabled={!isFormValid}>
          Crear Pokemon
        </button>
        <button type="button" onClick={handleClear}>
          Limpiar
        </button>
      </form>
    </div>
  );
}
