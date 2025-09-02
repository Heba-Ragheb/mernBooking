import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import './page.css'
import { AuthContext } from '../context/AuthContext'

import { useNavigate } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials]= useState({
    userId: '01',
    userEmail:'example@gmail.com',
    username :"",
    password:"",
   
  })
  const {dispatch}=useContext(AuthContext)
  const handleChange = e => {
    setCredentials(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };
  const handleClick = async e=>{e.preventDefault();
    dispatch({type:'LOGIN_START'})
 
   try {
    const res = await fetch(`${BASE_URL}/user/login`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(credentials)
    })
    const result = await res.json()
    if(!res.ok){alert(result.message)}
    console.log(result.data)
    localStorage.setItem('authToken', result.token);
    console.log(localStorage) // Store the token
 
    dispatch({type:'LOGIN_SUCCESS',payload:result.data})
    navigate('/')
   } catch (error) {
    dispatch({type:'LOGIN_SUCCESS',payload:error.message})
 
   }
    
  }


  return (
    <div className="main_box--main--login">
    <Form onSubmit={handleClick} >
      <input
        type="email"
        id="email"
        className="form-control"
        placeholder="Email"
        autoComplete="off"
       
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        className="form-control"
        placeholder="Password"
       
        onChange={handleChange}
      />
      <button className="btn btn-success" type="submit">
        LOGIN
      </button>
    </Form>
  </div>
  )
}

export default Login