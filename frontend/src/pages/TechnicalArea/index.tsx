import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useOverlap } from '../../hooks/overlap';
import { useSearch } from '../../hooks/search';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import { Container } from './styles';

const TechnicalArea: React.FC = () => {
  const { push } = useHistory();
  const { userPermission, checkToken } = useAuth();
  const { orderOpen, overlapOrderOpen } = useOverlap();
  const {
    selectedDate,
    selectedDeliveryDate,
    companyName,
    service,
    technical,
    status,
    searchDate,
    searchDeliveryDate,
    searchCompanyName,
    searchService,
    searchTechnical,
    searchStatus,
  } = useSearch();

  if (userPermission !== 'TechnicalArea' && userPermission !== 'Admin') {
    push('/Loading');
  }

  // This hook must be executed only once
  useEffect(() => {
    if (selectedDate) {
      searchDate(null);
    }

    if (companyName) {
      searchCompanyName('');
    }

    if (service) {
      searchService('');
    }

    if (technical) {
      searchTechnical('');
    }

    if (selectedDeliveryDate) {
      searchDeliveryDate(null);
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
