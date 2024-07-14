import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import ErrorDraw from '../components/ErrorDraw';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password })).then((data) => {
      if (data.payload.isRegister) {
        navigate("/")
      }
    });
  };

  return (
    <div>
      <Container className="mt-5 login_container">
        <h2 className='mb-2'>Register</h2>
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formUsername" className='mb-2'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button type="submit" className='login-btn'>
              {loading ? <Loader type="button" size="sm" inline /> : 'Register'}
            </Button>
          </div>
          <ErrorDraw show={error && true} error={error} />
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
