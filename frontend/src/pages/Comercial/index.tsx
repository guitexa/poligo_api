import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ContractIcon from '../../assets/icons/icon-contract.svg';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import SearchBar from '../../components/SearchBar';
import NewOrder from '../../components/NewOrder';
import SearchResults from '../../components/SearchResults';

import { useOverlap } from '../../hooks/overlap';
import { useAuth } from '../../hooks/auth';
import { useSearch } from '../../hooks/search';

import { NewOrderOverlap, Container } from './styles';

const Comercial: React.FC = () => {
  const {
    orderOpen,
    newOrderOpen,
    overlapNewOrderOpen,
    overlapOrderOpen,
  } = useOverlap();
  const { push } = useHistory();
  const { user, checkToken } = useAuth();
  const {
    company_name,
    selectedDate,
    selectedDeliveryDate,
    seller,
    product,
    status_billing,
    status_delivery,
    status_order,
    technical,
    total_value,
    clearAllResults,
  } = useSearch();

  // This hook must be executed only once
  useEffect(() => {
    if (user.permissions !== 'Comercial' && user.permissions !== 'Admin') {
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
      product ||
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
