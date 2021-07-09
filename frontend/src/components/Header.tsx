import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../state/action-creators/userActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
const Header: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;

  //HANDLERS
  const logoutHandler = () => {
    dispatch(logout());
  };
  //HTML CONDITIONALS
  const loggedHTMl = (
    <NavDropdown title={userInfo ? userInfo.name : ''} id='username'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
  const adminMenuHTMl = (
    <NavDropdown title='Admin' id='adminmenu'>
      <LinkContainer to='/admin/userlist'>
        <NavDropdown.Item>Users</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );

  const guestHTML = (
    <LinkContainer to='/login'>
      <Nav.Link>
        <i className='fas fa-user'></i> Sign In
      </Nav.Link>
    </LinkContainer>
  );
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Starter</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route
              render={({ history, location, match }) => (
                <SearchBox
                  history={history}
                  location={location}
                  match={match}
                />
              )}
            />
            <Nav className='ml-auto'>
              {userInfo ? loggedHTMl : guestHTML}
              {userInfo && userInfo.isAdmin && adminMenuHTMl}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
