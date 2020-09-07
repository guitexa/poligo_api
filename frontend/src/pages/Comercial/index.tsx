import React, { useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import SearchBar from '../../components/SearchBar';
import Content from '../../components/Content';

import { Container } from './styles';

const Comercial: React.FC = () => {
  const [contentOpen, setContentOpen] = useState(false);

  return (
    <Container>
      <Header title="Comercial" color="#004A82">
        <HeaderButton
          type="button"
          icon={contentOpen ? FaTimes : ContractIcon}
          color="#004A82"
          add={!contentOpen}
          onClick={() => setContentOpen(!contentOpen)}
        />
      </Header>
      <SearchBar color="#004A82" />
      {contentOpen && <Content />}
    </Container>
  );
};

export default Comercial;
