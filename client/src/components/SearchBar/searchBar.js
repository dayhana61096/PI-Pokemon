import { useState } from 'react';
import styles from '../SearchBar/searchBar.module.css';

const SearchBar = ({onSearch}) => {
  const [searchName, setSearchName] = useState('');

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchName);
  };  

  return (
    <div>
      <div>
        <input
          className={styles.input}
          type="text"
          value={searchName}
          onChange={handleInputChange}
          placeholder="Buscar..."
        />
        <button className={styles.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>      
    </div>
  );
};

export default SearchBar;
