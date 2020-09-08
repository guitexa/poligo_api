import React, { useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import SearchBar from '../../components/SearchBar';
import NewOrder from '../../components/NewOrder';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const Comercial: React.FC = () => {
  const [newOrderOpen, setNewOrderOpen] = useState(false);

  const color = '#004A82';

  return (
    <Container>
      <Header title="Comercial" color={color}>
        <HeaderButton
          type="button"
          icon={newOrderOpen ? FaTimes : ContractIcon}
          color={color}
          add={!newOrderOpen}
          onClick={() => setNewOrderOpen(!newOrderOpen)}
        />
      </Header>
      <SearchBar color={color} />
      {newOrderOpen && <NewOrder />}
      <SearchResults color={color} />
    </Container>
  );
};

export default Comercial;
