import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const {isLoggedIn} = useContext(AuthContext);
console.log(isLoggedIn)
  const handleLogin = () => {
    if (email && password) {
      if (email.includes('@') && password.length >= 7) {
        login();
      }
    } else {
      // Handle empty fields
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;


