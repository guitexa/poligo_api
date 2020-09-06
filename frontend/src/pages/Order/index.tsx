import React from 'react';

import { FaTimes } from 'react-icons/fa';

import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';

import { Container } from './styles';

const Order: React.FC = () => {
  return (
    <Container>
      <Header title="Comercial" color="#004A82">
        <HeaderButton icon={FaTimes} color="#004A82" link="/Comercial" />
      </Header>
    </Container>
  );
};

export default Order;
