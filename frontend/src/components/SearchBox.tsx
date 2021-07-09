import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
const SearchBox: React.FC<RouteComponentProps> = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  //HANDLER
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
    console.log('Handle');
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
