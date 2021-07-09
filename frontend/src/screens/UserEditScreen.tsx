import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  getUserDetails,
  updateUser,
} from '../state/action-creators/userActions';
import RouteComponentsPropsInterface from '../interface/RouteComponentsPropsInterface';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { USER_UPDATE_ACTION } from '../state/action-types';

const UserEditScreen: React.FC<RouteComponentsPropsInterface> = ({
  match,
  history,
}) => {
  //User id on the url
  const userId = match.params.id;
  //Get State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useTypedSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useTypedSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ACTION.USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (user === undefined || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
        if (user.isAdmin) setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  //Handlers
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //DISPATCH REGISTER
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      }),
    );
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
