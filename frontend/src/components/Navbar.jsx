import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
const MyNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate('/login'));
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand>
          <Link to={`${logged?'/':'/login'}`}>Blogging Platform</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='d-flex align-items-center'>
            <Nav.Link>{logged?<Link to="/">Home</Link>:<Link to="/login">Login</Link>}</Nav.Link>
            <Nav.Link >{logged?<Link to="/create-blog">Create Blog</Link>:<Link to="/register">Register</Link>}</Nav.Link>
            {logged && <Nav.Link ><Button variant="secondary" onClick={handleLogout}>Logout</Button></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
