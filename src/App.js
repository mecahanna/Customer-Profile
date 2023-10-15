import './App.css';
import React, { useContext } from "react";
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { AuthProvider } from './components/AuthContext/AuthContext';
import CharacterList from './components/CharacterList/CharacterList';
import { AuthContext } from './components/AuthContext/AuthContext';
function App() {
  const isLoggedIn  = useContext(AuthContext);
  return ( 
 <div className="App">
  <AuthProvider>
  <Header/>
  { isLoggedIn ? <CharacterList/>:<MainPage/>}
  </AuthProvider>
  
  </div>
   
 
  );
}

export default App;
