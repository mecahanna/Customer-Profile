import React, { useEffect, useState } from 'react';

import { retrieveCharacters } from '../../services/rnm.service'

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [search,setsearch]=useState();
  const [filters, setFilters] = React.useState({
    page: 1,
    name: "",
    gender:"",
    status:"",
    species:""
  })

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
       
        const data = await retrieveCharacters(filters.page, filters.name,filters.status, filters.gender,filters.species)
        setCharacters(data.results);
        setTotalPageCount(data.info.pages);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();
  }, [filters]);

  const handleChange = (e) => {
  setFilters( ((prevState) => { return {...prevState, [e.target.name] : e.target.value}}))
  }

  const handleSearchsubmitted = () => {
    setFilters({
      ...filters,
      name: search
    })
  }


  // Function to toggle the showDetails state
  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters({ ...filters, page: filters.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (filters.page < totalPageCount) {
      setFilters({ ...filters, page: filters.page + 1 });
    }
  };
console.log(filters)
  return (
    <div>
      <h2>Character List</h2>
      <div>
        <input
          type="text"
          placeholder="Search characters"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button onClick={handleSearchsubmitted}>submit</button>
        <div className="filter-options">
          <select
          name='gender'
            value={filters.gender}
            onChange={handleChange}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        
          <select
            name='status'
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
             name='species'
            value={filters.species}
            onChange={handleChange}
          >
            <option value="">All Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="animal">Animal</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <ul>
        {characters && characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
            {showDetails && ( // Conditionally render details based on showDetails state
              <>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
              </>
            )}
            <button onClick={toggleShowDetails}>
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </li>
        ))}
      </ul>
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={filters.page === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={filters.page === totalPageCount}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CharacterList;