import React, { useState } from 'react';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const Billing: React.FC = () => {
  const [orderOpen, setOrderOpen] = useState(false);

  const color = '#c9a100';

  return (
    <Container>
      <Header title="Faturamento" color={color} />
      <SearchBar color={color} from="Billing" />
      <SearchResults
        color={color}
        orderOpen={orderOpen}
        setOrderOpen={(e) => setOrderOpen(e)}
        from="Billing"
      />
    </Container>
  );
};

export default Billing;
