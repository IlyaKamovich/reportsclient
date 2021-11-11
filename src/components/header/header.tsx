import React from 'react';
import { IHeader } from '../../interfaces/header';

const Header: React.FC<IHeader> = (props) => {
  const { title } = props;

  return (
    <header>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export { Header };
