import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
} from '../state/action-creators/userActions';
import RouteComponentsPropsInterface from '../interface/RouteComponentsPropsInterface';
import { useTypedSelector } from '../hooks/useTypedSelector';

const ProfileScreen: React.FC<RouteComponentsPropsInterface> = ({
  location,
  history,
}) => {
  //Get State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userDetails = useTypedSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useTypedSelector(
    (state) => state.userUpdateProfile,
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'));
      } else {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  //Handlers
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //DISPATCH UPDATE PROFILE
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user?._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
