import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import MaterialTooltip from '../../components/MaterialTooltip';

import Logo from '../../assets/logo.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} />
        </div>
      </Content>

      <button onClick={() => history.push('/')}>
        <MaterialTooltip title="Sair" arrow placement="right">
          <FiPower size={30} />
        </MaterialTooltip>
      </button>
    </Container>
  );
};

export default Dashboard;
