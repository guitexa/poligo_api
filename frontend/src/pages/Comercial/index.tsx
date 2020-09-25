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
  const [orderOpen, setOrderOpen] = useState(false);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [newServiceOpen, setNewServiceOpen] = useState(false);

  const color = '#004A82';

  return (
    <>
      {newOrderOpen && (
        <OrderOverlapping>
          <NewOrder
            color={color}
            newServiceOpen={newServiceOpen}
            setNewServiceOpen={(e) => setNewServiceOpen(e)}
          />
          <HeaderButton
            show={newOrderOpen && !newServiceOpen}
            handleClick={(e) => setNewOrderOpen(!e)}
            type="button"
            icon={FaTimes}
            color={color}
          />
        </OrderOverlapping>
      )}
      <Container>
        <Header title="Comercial" color={color}>
          <HeaderButton
            add
            show={!newOrderOpen && !orderOpen}
            handleClick={(e) => setNewOrderOpen(!!e)}
            type="button"
            icon={ContractIcon}
            color={color}
          />
        </Header>
        <SearchBar color={color} />
        <SearchResults
          color={color}
          orderOpen={orderOpen}
          setOrderOpen={(e) => setOrderOpen(e)}
          from="Comercial"
        />
      </Container>
    </>
  );
};

export default Comercial;
