import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '10px'
  };

  return (
    <div style={headerStyle}>
      <h1>RequestBin Clone</h1>
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/bins">Bins</Link>
      </nav>
    </div>
  );
};

export default Header;
