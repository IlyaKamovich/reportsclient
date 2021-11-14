import React from 'react';

import './header.css';
interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
