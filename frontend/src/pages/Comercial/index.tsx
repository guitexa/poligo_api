import React, { useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import SearchBar from '../../components/SearchBar';
import NewOrder from '../../components/NewOrder';
import SearchResults from '../../components/SearchResults';

import { OrderOverlapping, Container } from './styles';

const Comercial: React.FC = () => {
  const [newOrderOpen, setNewOrderOpen] = useState(false);

  const color = '#004A82';

  return (
    <>
      {newOrderOpen && (
        <OrderOverlapping>
          <NewOrder />
          <HeaderButton
            show={newOrderOpen}
            handleClick={(e) => setNewOrderOpen(!e)}
            type="button"
            icon={FaTimes}
            color={color}
            add={!newOrderOpen}
          />
        </OrderOverlapping>
      )}
      <Container>
        <Header title="Comercial" color={color}>
          <HeaderButton
            show={!newOrderOpen}
            handleClick={(e) => setNewOrderOpen(!!e)}
            type="button"
            icon={ContractIcon}
            color={color}
            add={!newOrderOpen}
          />
        </Header>
        <SearchBar color={color} />
        <SearchResults color={color} />
      </Container>
    </>
  );
};

export default Comercial;
