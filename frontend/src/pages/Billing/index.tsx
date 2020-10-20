import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const Billing: React.FC = () => {
  const { push } = useHistory();
  const { userPermission } = useAuth();

  if (userPermission !== 'Billing' && userPermission !== 'Admin') {
    push('/Loading');
  }

  const color = '#c9a100';

  return (
    <Container>
      <Header title="Faturamento" color={color} />
      <SearchBar color={color} from="Billing" />
      <SearchResults color={color} from="Billing" />
    </Container>
  );
};

export default Billing;
