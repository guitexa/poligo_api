import React from 'react';
import { FiPower } from 'react-icons/fi';

import MaterialTooltip from '../../components/MaterialTooltip';

import { useAuth } from '../../hooks/auth';

import Logo from '../../assets/logo.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} />
        </div>
      </Content>

      <button onClick={signOut}>
        <MaterialTooltip title="Sair" arrow placement="right">
          <FiPower size={30} />
        </MaterialTooltip>
      </button>
    </Container>
  );
};

export default Dashboard;
