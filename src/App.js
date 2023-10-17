import './App.css';
import React from "react";
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { AuthProvider } from './components/AuthContext/AuthContext';
import Loader from './components/Loader/Loader';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <MainPage />
        <Loader/>
      </AuthProvider>
    </div>
  );
}

export default App;
