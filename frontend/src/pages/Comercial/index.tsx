import React from 'react';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButtonAdd from '../../components/HeaderButtonAdd';
import SearchBar from '../../components/SearchBar';

import { Container } from './styles';

const Comercial: React.FC = () => {
  return (
    <Container>
      <Header title="Comercial" color="#004A82">
        <HeaderButtonAdd icon={ContractIcon} color="#004A82" link="/Order" />
      </Header>
      <SearchBar />
    </Container>
  );
};

export default Comercial;
