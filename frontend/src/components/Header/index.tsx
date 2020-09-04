import React from 'react';

import Menu from '../Menu';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ title, color }) => {
  return (
    <Container color={color}>
      <Menu />
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
