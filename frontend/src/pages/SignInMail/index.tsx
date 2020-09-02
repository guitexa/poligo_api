import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import DisabledButton from '../../components/DisabledButton';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
}

const SignInMail: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signInMail } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signInMail({
          email: data.email,
        });

        history.push('/Login');
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
    [history, addToast, signInMail]
  );

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} alt="Logo Poligo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              icon={FiMail}
              autoFocus
              placeholder="Digite seu e-mail"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <a href="/">Esqueceu seu e-mail?</a>
            {inputValue ? (
              <Button>Continuar</Button>
            ) : (
              <DisabledButton>Continuar</DisabledButton>
            )}
          </Form>
        </div>
        {/* <Link to="/SignUp">
          <FiLogIn size={20} />
          Criar conta
        </Link> */}
      </Content>
    </Container>
  );
};

export default SignInMail;
