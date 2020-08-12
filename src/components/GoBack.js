import React from 'react';
import { Link } from 'gatsby';
import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack';

const GoBack = ({ to, name }) => (
  <p>
    <Link to={to}>
      <ArrowBack size={16} /> {name}
    </Link>
  </p>
);

export default GoBack;
