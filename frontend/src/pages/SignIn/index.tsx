import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} alt="Logo Poligo" />
          <form>
            <Input name="mail" icon={FiMail} autoFocus placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <a href="">Esqueceu sua senha?</a>
            <Button>Entrar</Button>
          </form>
        </div>
        <Link to="/signup">
          <FiLogIn size={20} />
          Criar conta
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
