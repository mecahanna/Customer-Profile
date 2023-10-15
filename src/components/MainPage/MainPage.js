import React, { useContext } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import CharacterList from '../CharacterList/CharacterList';
import { AuthContext } from '../AuthContext/AuthContext';

const MainPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn ? <CharacterList /> : <LoginForm />}
    </div>
  );
}

export default MainPage;