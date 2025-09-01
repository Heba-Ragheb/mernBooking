import React, { useState ,useContext} from 'react'
import { Form } from 'react-bootstrap'
import './page.css'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../Service/Config'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials]= useState({
    
    userEmail:undefined,
    username :undefined,
    password:undefined,
   
  })
  const {dispatch}=useContext(AuthContext)
  const handleChange = e => {
    setCredentials(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };
  const handleClick = async e=>{e.preventDefault();

   try {
    const res = await fetch(`${BASE_URL}/user/register`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(credentials)
    })
    const result = await res.json()
    if(!res.ok){alert(result.message)}
    dispatch({type:'REGISTER_SUCCES'})
    navigate('/login')
   } catch (error) {
    alert(error.message)
   }
  }
  return (
    <div className="main_box--main--login">
    <Form onSubmit={handleClick} >
      <input
        type="text"
        id="username"
        className="form-control"
        placeholder="Username"
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
       <input
        type="Email"
        id="email"
        className="form-control"
        placeholder="Email"
       
        onChange={handleChange}
      />
     
      <button className="btn btn-success" type="submit">
        Register
      </button>
    </Form>
  </div>
  )
}

export default Register