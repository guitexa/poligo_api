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
  const { userPermission, checkToken } = useAuth();
  const { orderOpen, overlapOrderOpen } = useOverlap();
  const {
    selectedDate,
    companyName,
    service,
    seller,
    status,
    value,
    searchDate,
    searchCompanyName,
    searchService,
    searchSeller,
    searchValue,
    searchStatus,
  } = useSearch();

  // This hook must be executed only once
  useEffect(() => {
    if (userPermission !== 'Billing' && userPermission !== 'Admin') {
      push('/Loading');
    }

    if (selectedDate) {
      searchDate(null);
    }

    if (companyName) {
      searchCompanyName('');
    }

    if (service) {
      searchService('');
    }

    if (seller) {
      searchSeller('');
    }

    if (value) {
      searchValue('');
    }

    if (status) {
      searchStatus('');
    }

    if (orderOpen) {
      overlapOrderOpen(false);
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
