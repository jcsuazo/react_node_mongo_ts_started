import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../state/action-creators/userActions';
import RouteComponentsPropsInterface from '../interface/RouteComponentsPropsInterface';
import { useTypedSelector } from '../hooks/useTypedSelector';

const UserListScreen: React.FC<RouteComponentsPropsInterface> = ({
  history,
}) => {
  const dispatch = useDispatch();

  const userList = useTypedSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useTypedSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, successDelete]);
  //HANDLERS
  const deleteHandler = (userId: string) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table className='table-sm' striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                if (user) {
                  return (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td className='align-middle text-center'>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className='align-middle text-center'>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant='info' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        {user._id !== undefined && (
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() =>
                              deleteHandler(user._id ? user._id : '')
                            }
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
