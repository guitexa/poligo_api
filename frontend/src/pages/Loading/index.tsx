import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import Logotipo from '../../assets/logotipo.svg';

import { Container } from './styles';

const Loading: React.FC = () => {
  const { push } = useHistory();
  const { user } = useAuth();

  if (user.permissions.name === 'Admin') {
    push('/Comercial');
  }

  if (user.permissions.name === 'Comercial') {
    push('/Comercial');
  }

  if (user.permissions.name === 'TechnicalArea') {
    push('/TechnicalArea');
  }

  if (user.permissions.name === 'Billing') {
    push('/Billing');
  }

  return (
    <Container>
      <img src={Logotipo} alt="" />
      <p>Carregando...</p>
    </Container>
  );
};

export default Loading;
