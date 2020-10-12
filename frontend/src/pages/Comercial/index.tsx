import React from 'react';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import SearchBar from '../../components/SearchBar';
import NewOrder from '../../components/NewOrder';
import SearchResults from '../../components/SearchResults';

import { useOverlap } from '../../hooks/overlap';

import { NewOrderOverlap, Container } from './styles';

const Comercial: React.FC = () => {
  const { orderOpen, newOrderOpen, overlapNewOrderOpen } = useOverlap();

  const color = '#004A82';

  return (
    <>
      {newOrderOpen && (
        <NewOrderOverlap>
          <NewOrder color={color} />
        </NewOrderOverlap>
      )}
      <Container>
        <Header title="Comercial" color={color}>
          <HeaderButton
            add
            show={!newOrderOpen && !orderOpen}
            handleClick={(e) => overlapNewOrderOpen(!!e)}
            type="button"
            icon={ContractIcon}
            color={color}
          />
        </Header>
        <SearchBar color={color} from="Comercial" />
        <SearchResults color={color} from="Comercial" />
      </Container>
    </>
  );
};

export default Comercial;
