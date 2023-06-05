import { useState } from 'react';

const SearchBar = ({ onSearch,}) => {
  const [searchName, setSearchName] = useState('');
  const [showError, setShowError] = useState(false); //Estado para el manejo de error 

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
    setShowError(false); // Reiniciar el estado de showError al cambiar el valor de búsqueda
  };

  const handleSearch = () => {
    onSearch(searchName);
    setShowError(true); // Mostrar el mensaje de error después de realizar la búsqueda
  };  

  return (
    <div>
      <input type="text" value={searchName} onChange={handleInputChange} placeholder='Buscar...' />
      <button onClick={handleSearch}>Search</button>
      {showError && <p> ¡Oops no se encontraron resultados! </p>}    
    </div>
  );
};

export default SearchBar;
