import React from 'react';
import Container from 'react-bootstrap/Container';
import './NoMatch.css'
import { NavLink } from 'react-router-dom';

const NoMatch = () => {
  return (
    <>
    <Container className='no-match-container'>
      <div className="no-match-main">
        <div className="error-oops">
            Oops!
        </div>
        <div className="page-not-found">
            404 - Page Not Found
        </div>
        <div className="may-be-removed">
            The page are looking for might have removed <br />had its name changed or is temporarily unavailable
        </div>
        <NavLink to="/">
            <button className='back-to-home-from-error'>Go to Homepage</button>
        </NavLink>
      </div>
    </Container>
    </>
  );
}

export default NoMatch;
