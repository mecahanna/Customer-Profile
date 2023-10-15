import React, { useEffect, useState } from 'react';
const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
  
    // Function to fetch character data
    const fetchCharacterData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };
  
    // Function to filter characters based on the search query
    const filteredCharacters = characters.filter((character) => {
      return character.name.toLowerCase().includes(search.toLowerCase());
    });
  
    useEffect(() => {
      fetchCharacterData();
    }, []);
  
    return (
      <div>
        <h2>Character List</h2>
        <input
          type="text"
          placeholder="Search characters"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.id}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CharacterList;