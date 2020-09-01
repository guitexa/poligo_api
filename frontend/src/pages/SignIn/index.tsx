import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          description: 'Usuário logado com sucesso!',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          description: 'Verifique as informações digitadas e tente novamente',
        });
      }
    },
    [history, addToast, signIn]
  );

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} alt="Logo Poligo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" icon={FiMail} autoFocus placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <a href="/">Esqueceu sua senha?</a>
            <Button>Entrar</Button>
          </Form>
        </div>
        <Link to="/SignUp">
          <FiLogIn size={20} />
          Criar conta
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
