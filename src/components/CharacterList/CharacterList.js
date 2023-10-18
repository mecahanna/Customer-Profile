import React, { useEffect, useState } from 'react';

import { retrieveCharacters } from '../../services/rnm.service';
import {
  Pagination,
  Button,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
} from '@mui/material';
import Loader from '../Loader/Loader';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    name: '',
    gender: '',
    status: '',
    species: '',
  });

  useEffect(() => {
    const fetchCharacterData = async () => {
      setLoading(true)
      try {
        const data = await retrieveCharacters(
          filters.page,
          filters.name,
          filters.status,
          filters.gender,
          filters.species
        );
        // Add a 'showDetails' property to each character and initialize it to false
        const charactersWithDetails = data.results.map((character) => ({
          ...character,
          showDetails: false,
        }));
        setCharacters(charactersWithDetails);
        setTotalPageCount(data.info.pages);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();
  }, [filters]);

  const handleChange = (e) => {
    setFilters((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSearchSubmitted = () => {
    setFilters({
      ...filters,
      name: search,
    });
  };

  const toggleShowDetails = (characterId) => {
    // Toggle the 'showDetails' property for the clicked character
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === characterId
          ? { ...character, showDetails: !character.showDetails }
          : character
      )
    );
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


  // Split characters into three columns
  const columns = [[], [], []];
  characters.forEach((character, index) => {
    columns[index % 3].push(character);
  });

  return (
    <div>
      <h2>Character List</h2>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={2}>
          <Input
            type="text"
            placeholder="Search characters"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={0}>
          <Button variant="contained" color="primary" onClick={handleSearchSubmitted}>
            Submit
          </Button>
        </Grid>
      </Grid>
      

      <div>
        <Grid container justifyContent="center" alignItems="center" padding={3} spacing={3}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={filters.gender} onChange={handleChange}>
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="genderless">Genderless</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={filters.status} onChange={handleChange}>
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="alive">Alive</MenuItem>
                <MenuItem value="dead">Dead</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select name="species" value={filters.species} onChange={handleChange}>
                <MenuItem value="">All Species</MenuItem>
                <MenuItem value="human">Human</MenuItem>
                <MenuItem value="alien">Alien</MenuItem>
                <MenuItem value="animal">Animal</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>




      <Grid container spacing={2}>
        {!loading ? columns.map((column, columnIndex) => (
          <Grid item xs={4} key={columnIndex}>
            <List>
              {column.map((character) => (
                <ListItem key={character.id}>
                  <ListItemAvatar>
                    <Avatar src={character.image} alt={character.name} />
                  </ListItemAvatar>
                  <ListItemText primary={character.name} secondary={character.showDetails && (
                    <>
                      <Typography>Status: {character.status}</Typography>
                      <Typography>Species: {character.species}</Typography>
                      <Typography>Gender: {character.gender}</Typography>
                    </>
                  )} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleShowDetails(character.id)}
                  >
                    {character.showDetails ? 'Hide Details' : 'Show Details'}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
        )): <Loader/>}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
        <Pagination
          count={totalPageCount}
          page={filters.page}
          onChange={(event, page) => setFilters({ ...filters, page })}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>


      <div className="pagination">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevPage}
          disabled={filters.page === 1}
          style={{ marginRight: '10px' }}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={filters.page === totalPageCount}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default CharacterList;

