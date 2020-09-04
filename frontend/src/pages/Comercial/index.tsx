import React from 'react';
import { FiPower } from 'react-icons/fi';

import MaterialTooltip from '../../components/MaterialTooltip';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';
import Header from '../../components/Header';

const Comercial: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header title="Comercial" color="#004A82" />
      <button type="button" onClick={signOut}>
        <MaterialTooltip title="Sair" arrow placement="left">
          <FiPower size={20} />
        </MaterialTooltip>
      </button>
    </Container>
  );
};

export default Comercial;
