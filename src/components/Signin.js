
import React, { useState } from 'react';
import {Link} from 'react-router-dom';



const Signin = ({type, setToken, setUser}) => {
 
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const title = type === 'login' ? 'Login' : 'Register';
const toggleTitle = type === 'login' ? 'Register' : 'Login';
const toggleType =  type === 'login' ? 'register' : 'login';


const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('username: ', username);
  console.log('password: ', password);
  const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/${type}`, { // or use the `/users/login` route for login!
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password
      }
    })
  });
  console.log('response: ', response);
  const {data} = await response.json();
  console.log('{data}: ', {data});
  const token = data?.token;
  console.log('token: ', token);
  if (token) {
  setToken(token);
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const {data} = await response.json();
  setUser(data)
  }
  setUsername('');
  setPassword('');
}

return <>
  <h2>{title}</h2>
  <form onSubmit={handleSubmit}>
    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}placeholder="username"></input>
    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}placeholder="password"></input>
    <button type="submit">{title}</button>
  </form>
  <Link to={`/${toggleType}`}>{toggleTitle}</Link>
</>
}



export default Signin;

