import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useOverlap } from '../../hooks/overlap';
import { useSearch } from '../../hooks/search';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const Billing: React.FC = () => {
  const { push } = useHistory();
  const { user, checkToken } = useAuth();
  const { orderOpen, overlapOrderOpen } = useOverlap();
  const {
    company_name,
    selectedDate,
    selectedDeliveryDate,
    seller,
    service,
    status_billing,
    status_delivery,
    status_order,
    technical,
    total_value,
    clearAllResults,
  } = useSearch();

  // This hook must be executed only once
  useEffect(() => {
    if (user.permissions !== 'Billing' && user.permissions !== 'Admin') {
      push('/Loading');
    }

    if (orderOpen) {
      overlapOrderOpen(false);
    }

    if (
      company_name ||
      selectedDate ||
      selectedDeliveryDate ||
      seller ||
      service ||
      status_billing ||
      status_delivery ||
      status_order ||
      technical ||
      total_value
    ) {
      clearAllResults();
    }

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
