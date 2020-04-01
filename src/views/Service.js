import React from 'react';
import { Link } from 'react-router-dom';

const Service = (props) => {
  return (
    <div>
      <h1>
        Service
        <Link to="/service/5">Service 5</Link>
      </h1>
    </div>
  );
};

export default Service;
