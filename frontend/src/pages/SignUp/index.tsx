import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../service/api';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface DataForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: DataForm) => {
    await api.post('/users', data);
  }, []);

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} alt="Logo Poligo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} autoFocus placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button>Cadastrar</Button>
          </Form>
        </div>
        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para página de login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
