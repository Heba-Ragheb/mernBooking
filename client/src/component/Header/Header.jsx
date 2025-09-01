import React ,{ useContext}from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import { CiMenuBurger } from "react-icons/ci";
import logo from "../../assets/images/logo.png"
import './Header.css';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];

const Header = () => {
  const {user,dispatch}=useContext(AuthContext)
const navigate = useNavigate()
const logout=()=>{
  dispatch({type:'LOGOUT'})
  navigate('/')
}
  return (
    <div>
      <Container>
        <Row>
          <div className="nav-wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {navLinks.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink to={item.path}
                    className={navClass => navClass.isActive?"active_link":""}>{item.display}</NavLink>
                  </li>
                ))}
              </ul></div>
            
            <div className="nav-right d-flex align-items-center gap-4">
            <div className="nav-btn d-flex align-items-center gap-4">
            {user?(<><h5>{user.username}</h5>
              <Button onClick={logout}>
                 Logout
                </Button>
                </>):(<><Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button>
               < Link to="/register">Register</Link>
                </Button></>)}  
             
                
              </div>
              <span className="mobile-menu"><CiMenuBurger /></span>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Header;