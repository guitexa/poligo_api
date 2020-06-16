import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';

import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo Poligo" />
        <div>
          <Input name="name" icon={FiUser} placeholder="Usuário" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <a href="">Esqueceu sua senha?</a>
          <button>Entrar</button>
        </div>
      </Content>
    </Container>
  );
};

export default SignIn;
