import './App.css';
import React from "react";
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { AuthProvider } from './components/AuthContext/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <MainPage />
      </AuthProvider>
    </div>
  );
}

export default App;
