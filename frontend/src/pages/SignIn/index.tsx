import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';

import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo Poligo" />
        <div>
          <Input name="name" icon={FaUser} placeholder="Usuário" />
          <Input
            name="password"
            icon={FaLock}
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
