import React from 'react';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const TechnicalArea: React.FC = () => {
  const color = '#1C8F07';

  return (
    <Container>
      <Header title="Área Técnica" color={color} />
      <SearchBar color={color} from="TechnicalArea" />
      <SearchResults color={color} from="TechnicalArea" />
    </Container>
  );
};

export default TechnicalArea;
