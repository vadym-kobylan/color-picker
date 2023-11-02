import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ChoosingBar = ({ colorPicersList }) => {
  let location = useLocation();

  return (
    <div className="choosingBar">
      {colorPicersList.map(({ name, href }) => (
        <Link
          to={href}
          key={name + href}
          className={`choosingBar-button ${location.pathname === href && 'active'}`}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default ChoosingBar;
