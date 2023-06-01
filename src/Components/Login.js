import React, { useState, useEffect } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  return(
    <div className="login-container">
      <a className="StyledLoginButton" href={'http://localhost:3000/login'}>Log In/Register</a>
    </div>
  )
}

export default Login;


/*
const Login = ()=> {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ login }>
        <input
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <input
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
*/
