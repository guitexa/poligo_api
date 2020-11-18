import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import {
  ThemeProvider,
  createMuiTheme,
  TextField as OriginalTextField,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FaTimes } from 'react-icons/fa';
import { FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { isCNPJ, isCPF, isPhone, formatToCapitalized } from 'brazilian-values';
import isEmail from 'validator/es/lib/isEmail';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { TextField } from 'unform-material-ui';
import InputMask, { Props as InputProps } from 'react-input-mask';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useOverlap } from '../../hooks/overlap';

import HeaderButton from '../HeaderButton';
import Order from '../Order';
import Button from '../Button';
import DisabledButton from '../DisabledButton';

import api from '../../services/api';

import {
  NewOrderOverlap,
  Container,
  Content,
  AskTitle,
  WhatIsClientName,
  WhatIsClientCnpj,
  WhatIsClientCpf,
  WhatIsClientNameContact,
  WhatIsClientEmail,
  WhatIsClientMobilePhone,
  WhatIsClientPhone,
  SubmitQuestionButton,
  Footer,
  Progress,
  ButtonsControl,
  ConfirmData,
  QuestionData,
  QuestionsContainer,
  AnswersContainer,
  SubmitFormButton,
} from './styles';

interface ClientData {
  id?: string;
  inputValue?: string;
  name: string;
  cpf_cnpj: string;
  contact_name: string;
  email?: string;
  phone: string;
  mobile?: string;
}

interface CreateOrderType {
  id: string;
  client_id: string;
  seller_id: string;
}

interface InputData {
  clientCnpjData: string;
  clientCpfData: string;
  clientNameContactData: string;
  clientEmailData: string;
  clientPhoneData: string;
  clientMobilePhoneData: string;
}

interface NewOrderProps {
  color: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ color }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>('');
  const [clients, setClients] = useState<ClientData[]>([]);
  const [clientName, setClientName] = useState<ClientData>({} as ClientData);
  const [clientCnpj, setClientCnpj] = useState('');
  const [clientCpf, setClientCpf] = useState('');
  const [clientNameContact, setClientNameContact] = useState('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientMobilePhone, setClientMobilePhone] = useState('');

  const [clientNameOpen, setClientNameOpen] = useState(true);
  const [clientCnpjOpen, setClientCnpjOpen] = useState(false);
  const [clientCpfOpen, setClientCpfOpen] = useState(false);
  const [clientNameContactOpen, setClientNameContactOpen] = useState(false);
  const [clientEmailOpen, setClientEmailOpen] = useState(false);
  const [clientPhoneOpen, setClientPhoneOpen] = useState(false);
  const [clientMobilePhoneOpen, setClientMobilePhoneOpen] = useState(false);
  const [confirmDataOpen, setConfirmDataOpen] = useState(false);

  const [counterAnswers, setCounterAnswers] = useState<string[]>([]);
  const [confirmDataHasOpened, setConfirmDataHasOpened] = useState(false);

  const { addToast } = useToast();
  const { user, checkToken } = useAuth();
  const { newOrderOpen, overlapNewOrderOpen } = useOverlap();

  const clientCnpjRef = useRef<FormHandles>(null);
  const clientCpfRef = useRef<FormHandles>(null);
  const clientNameContactRef = useRef<FormHandles>(null);
  const clientEmailRef = useRef<FormHandles>(null);
  const clientPhoneRef = useRef<FormHandles>(null);
  const clientMobilePhoneRef = useRef<FormHandles>(null);

  const newOrderMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    overrides: {
      MuiAutocomplete: {
        option: {
          '&:hover': {
            backgroundColor: color,
            color: '#fff',
          },
          '&[data-focus="true"]': {
            backgroundColor: color,
            color: '#fff',
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
            },
          },
          '&[aria-selected="true"]': {
            backgroundColor: color,
            color: '#fff',
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
            },
          },
        },
      },
    },
  });

  const filter = createFilterOptions<ClientData>();

  useEffect(() => {
    checkToken();
    api.get<ClientData[]>('/clients').then((response) => {
      setClients(response.data);
    });
  }, [checkToken]);

  const handleShowData = useCallback(() => {
    setClientNameOpen(false);
    setClientCnpjOpen(false);
    setClientCpfOpen(false);
    setClientNameContactOpen(false);
    setClientEmailOpen(false);
    setClientMobilePhoneOpen(false);
    setClientPhoneOpen(false);
    setConfirmDataOpen(true);
  }, []);

  const handleSubmitClientName = useCallback(() => {
    if (clientName.name) {
      setClientNameOpen(!clientNameOpen); // Close question opened
      setClientCnpjOpen(!clientCnpjOpen); // Open next question

      if (!counterAnswers.find((e) => e === 'clientName')) {
        setCounterAnswers((state) => [...state, 'clientName']); // Set as answered
      }
    }

    if (
      confirmDataHasOpened &&
      (counterAnswers.includes('clientCnpj') ||
        counterAnswers.includes('clientCpf')) &&
      counterAnswers.includes('clientNameContact') &&
      counterAnswers.includes('clientEmail') &&
      (counterAnswers.includes('clientPhone') ||
        counterAnswers.includes('clientMobilePhone'))
    ) {
      handleShowData();
    }
  }, [
    clientName.name,
    confirmDataHasOpened,
    counterAnswers,
    clientNameOpen,
    clientCnpjOpen,
    handleShowData,
  ]);

  const handleSubmitClientCnpj = useCallback(
    ({ clientCnpjData }: InputData) => {
      if (clientCnpjData) {
        if (isCNPJ(clientCnpjData)) {
          clientCnpjRef.current?.setErrors({});
          setClientCnpjOpen(!clientCnpjOpen); // Close question opened
          setClientNameContactOpen(!clientNameContactOpen); // Open next question

          setClientCnpj(clientCnpjData);

          if (!counterAnswers.find((e) => e === 'clientCnpj')) {
            setCounterAnswers((state) => [...state, 'clientCnpj']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('clientName') &&
            counterAnswers.includes('clientNameContact') &&
            counterAnswers.includes('clientEmail') &&
            (counterAnswers.includes('clientPhone') ||
              counterAnswers.includes('clientMobilePhone'))
          ) {
            handleShowData();
          }
        } else {
          clientCnpjRef.current?.setErrors({
            clientCnpjData: 'CNPJ inválido',
          });
        }
      } else {
        setClientCnpjOpen(!clientCnpjOpen); // Close question opened
        setClientCpfOpen(!clientCpfOpen); // Close question opened

        setClientCnpj('');
        setCounterAnswers((state) => state.filter((e) => e !== 'clientCnpj'));
      }
    },
    [
      clientCnpjOpen,
      clientCpfOpen,
      clientNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitClientCpf = useCallback(
    ({ clientCpfData }: InputData) => {
      if (clientCpfData) {
        if (isCPF(clientCpfData)) {
          clientCpfRef.current?.setErrors({});
          setClientCpfOpen(!clientCpfOpen); // Close question opened
          setClientNameContactOpen(!clientNameContactOpen); // Open next question

          setClientCpf(clientCpfData);

          if (!counterAnswers.find((e) => e === 'clientCpf')) {
            setCounterAnswers((state) => [...state, 'clientCpf']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('clientName') &&
            counterAnswers.includes('clientNameContact') &&
            counterAnswers.includes('clientEmail') &&
            (counterAnswers.includes('clientPhone') ||
              counterAnswers.includes('clientMobilePhone'))
          ) {
            handleShowData();
          }
        } else {
          clientCpfRef.current?.setErrors({
            clientCpfData: 'CPF inválido',
          });
        }
      } else {
        clientCpfRef.current?.setErrors({
          clientCpfData: 'Favor preencher um CPF, ou CNPJ',
        });
        setClientCpf('');
        setCounterAnswers((state) => state.filter((e) => e !== 'clientCpf'));
      }
    },
    [
      clientCpfOpen,
      clientNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitClientNameContact = useCallback(
    ({ clientNameContactData }: InputData) => {
      if (clientNameContactData) {
        clientNameContactRef.current?.setErrors({});
        setClientNameContactOpen(!clientNameContactOpen); // Close question opened
        setClientEmailOpen(!clientEmailOpen); // Open next question

        setClientNameContact(
          formatToCapitalized(clientNameContactData, {
            trimTrailingWhiteSpaces: false,
          })
        );

        if (!counterAnswers.find((e) => e === 'clientNameContact')) {
          setCounterAnswers((state) => [...state, 'clientNameContact']); // Set as answered
        }

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('clientName') &&
          (counterAnswers.includes('clientCnpj') ||
            counterAnswers.includes('clientCpf')) &&
          counterAnswers.includes('clientEmail') &&
          (counterAnswers.includes('clientPhone') ||
            counterAnswers.includes('clientMobilePhone'))
        ) {
          handleShowData();
        }
      } else {
        clientNameContactRef.current?.setErrors({
          clientNameContactData: 'Favor preencher um nome',
        });
      }
    },
    [
      clientNameContactOpen,
      clientEmailOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitClientEmail = useCallback(
    ({ clientEmailData }: InputData) => {
      if (clientEmailData) {
        if (isEmail(clientEmailData)) {
          clientEmailRef.current?.setErrors({});
          setClientEmailOpen(!clientEmailOpen); // Close question opened
          setClientPhoneOpen(!clientPhoneOpen); // Open next question

          setClientEmail(clientEmailData);

          if (!counterAnswers.find((e) => e === 'clientEmail')) {
            setCounterAnswers((state) => [...state, 'clientEmail']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('clientName') &&
            (counterAnswers.includes('clientCnpj') ||
              counterAnswers.includes('clientCpf')) &&
            counterAnswers.includes('clientNameContact') &&
            (counterAnswers.includes('clientPhone') ||
              counterAnswers.includes('clientMobilePhone'))
          ) {
            handleShowData();
          }
        } else {
          clientEmailRef.current?.setErrors({
            clientEmailData: 'Favor preencher um e-mail válido',
          });
        }
      } else {
        clientEmailRef.current?.setErrors({
          clientEmailData: 'Favor preencher um e-mail',
        });
      }
    },
    [
      clientEmailOpen,
      clientPhoneOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitClientPhone = useCallback(
    ({ clientPhoneData }: InputData) => {
      if (clientPhoneData.length > 1) {
        if (isPhone(clientPhoneData)) {
          clientPhoneRef.current?.setErrors({});
          setClientPhoneOpen(!clientPhoneOpen); // Close question opened
          setClientMobilePhoneOpen(!clientMobilePhoneOpen); // Open next question

          setClientPhone(clientPhoneData);

          if (!counterAnswers.find((e) => e === 'clientPhone')) {
            setCounterAnswers((state) => [...state, 'clientPhone']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('clientName') &&
            (counterAnswers.includes('clientCnpj') ||
              counterAnswers.includes('clientCpf')) &&
            counterAnswers.includes('clientNameContact') &&
            counterAnswers.includes('clientEmail')
          ) {
            handleShowData();
          }
        } else {
          clientPhoneRef.current?.setErrors({
            clientPhoneData: 'Favor preencher um telefone fixo válido',
          });
        }
      } else if (clientMobilePhone) {
        setClientPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'clientPhone'));

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('clientName') &&
          (counterAnswers.includes('clientCnpj') ||
            counterAnswers.includes('clientCpf')) &&
          counterAnswers.includes('clientNameContact') &&
          counterAnswers.includes('clientEmail')
        ) {
          handleShowData();
        }
      } else {
        setClientPhoneOpen(!clientPhoneOpen); // Close question opened
        setClientMobilePhoneOpen(!clientMobilePhoneOpen); // Open next question

        setClientPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'clientPhone'));
      }
    },
    [
      clientMobilePhone,
      clientPhoneOpen,
      clientMobilePhoneOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitClientMobilePhone = useCallback(
    ({ clientMobilePhoneData }: InputData) => {
      if (clientMobilePhoneData.length > 1) {
        if (isPhone(clientMobilePhoneData)) {
          clientMobilePhoneRef.current?.setErrors({});
          setClientMobilePhoneOpen(!clientMobilePhoneOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);

          setClientMobilePhone(clientMobilePhoneData);

          if (!counterAnswers.find((e) => e === 'clientMobilePhone')) {
            setCounterAnswers((state) => [...state, 'clientMobilePhone']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('clientName') &&
            (counterAnswers.includes('clientCnpj') ||
              counterAnswers.includes('clientCpf')) &&
            counterAnswers.includes('clientNameContact') &&
            counterAnswers.includes('clientEmail')
          ) {
            handleShowData();
          }
        } else {
          clientMobilePhoneRef.current?.setErrors({
            clientMobilePhoneData: 'Favor preencher um telefone celular válido',
          });
        }
      } else if (clientPhone) {
        setClientMobilePhone('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'clientMobilePhone')
        );

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('clientName') &&
          (counterAnswers.includes('clientCnpj') ||
            counterAnswers.includes('clientCpf')) &&
          counterAnswers.includes('clientNameContact') &&
          counterAnswers.includes('clientEmail')
        ) {
          handleShowData();
        } else {
          clientMobilePhoneRef.current?.setErrors({});
          setClientMobilePhoneOpen(!clientMobilePhoneOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);
        }
      } else {
        setClientMobilePhone('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'clientMobilePhone')
        );
        clientMobilePhoneRef.current?.setErrors({
          clientMobilePhoneData: 'Favor preencher um telefone celular, ou fixo',
        });
      }
    },
    [
      clientPhone,
      clientMobilePhoneOpen,
      confirmDataOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleFinishForm = useCallback(
    (newClientName: ClientData) => {
      setClientName(newClientName);

      setCounterAnswers((state) => [...state, 'clientName']); // Set as answered

      const existentClient = clients.find(
        (client) => client.name === newClientName.name
      );

      if (existentClient) {
        if (existentClient.cpf_cnpj.length > 11) {
          setClientCnpj(existentClient.cpf_cnpj);
          setCounterAnswers((state) => [...state, 'clientCnpj']); // Set as answered
        } else {
          setClientCpf(existentClient.cpf_cnpj);
          setCounterAnswers((state) => [...state, 'clientCpf']); // Set as answered
        }

        if (existentClient.contact_name) {
          setClientNameContact(existentClient.contact_name);
          setCounterAnswers((state) => [...state, 'clientNameContact']); // Set as answered
        }

        if (existentClient.email) {
          setClientEmail(existentClient.email);
          setCounterAnswers((state) => [...state, 'clientEmail']); // Set as answered
        }

        if (existentClient.phone) {
          setClientPhone(existentClient.phone);
          setCounterAnswers((state) => [...state, 'clientPhone']); // Set as answered
        }

        if (existentClient.mobile) {
          setClientMobilePhone(existentClient.mobile);
          setCounterAnswers((state) => [...state, 'clientMobilePhone']); // Set as answered
        }

        handleShowData();
      }
    },
    [clients, handleShowData]
  );

  const handleSubmitForm = useCallback(() => {
    try {
      const formattedClientCnpj = clientCnpj.replace(/[^\w\s]/gi, '');
      const formattedClientCpf = clientCpf.replace(/[^\w\s]/gi, '');
      const formattedClientPhone = clientPhone.replace(/[^\w]/gi, '');
      const formattedClientMobilePhone = clientMobilePhone.replace(
        /[^\w]/gi,
        ''
      );

      const getClientIndex = clients.find(
        (client) =>
          client.cpf_cnpj === (formattedClientCnpj || formattedClientCpf)
      );

      if (!getClientIndex) {
        checkToken();
        api
          .post<ClientData>('/clients', {
            name: clientName.name,
            cpf_cnpj:
              (clientCnpj && formattedClientCnpj) ||
              (clientCpf && formattedClientCpf),
            contact_name: clientNameContact,
            email: clientEmail,
            phone: formattedClientPhone,
            mobile: formattedClientMobilePhone,
          })
          .then((client_response) => {
            api
              .post<CreateOrderType>('/orders', {
                client_id: client_response.data.id,
                seller_id: user.id,
              })
              .then((order_response) => {
                setOrderId(order_response.data.id);
              });
          });
      } else {
        checkToken();
        api
          .post<CreateOrderType>('/orders', {
            client_id: getClientIndex.id,
            seller_id: user.id,
          })
          .then((order_response) => {
            setOrderId(order_response.data.id);
          });
      }

      addToast({
        type: 'success',
        description: 'Pedido criado com sucesso!',
      });
      setConfirmDataOpen(false);
      setOrderOpen(true);
    } catch (err) {
      addToast({
        type: 'error',
        description: 'Erro inesperado ao criar o pedido',
      });
    }
  }, [
    addToast,
    checkToken,
    clientCnpj,
    clientCpf,
    clientEmail,
    clientMobilePhone,
    clientName.name,
    clientNameContact,
    clientPhone,
    clients,
    user.id,
  ]);

  const handleChangeToPreviousQuestion = useCallback(() => {
    if (
      clientNameOpen &&
      clientName.name &&
      (clientCnpj || clientCpf) &&
      clientNameContact &&
      clientEmail &&
      (clientPhone || clientMobilePhone)
    ) {
      setClientNameOpen(!clientNameOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (clientCnpjOpen) {
      setClientCnpjOpen(!clientCnpjOpen);
      setClientNameOpen(!clientNameOpen);
    }
    if (clientCpfOpen && !clientCpf) {
      setClientCpfOpen(!clientCpfOpen);
      setClientCnpjOpen(!clientCnpjOpen);
    }
    if (clientCpfOpen && clientCpf) {
      setClientCpfOpen(!clientCpfOpen);
      setClientNameOpen(!clientNameOpen);
    }
    if (clientNameContactOpen && clientCnpj) {
      setClientNameContactOpen(!clientNameContactOpen);
      setClientCnpjOpen(!clientCnpjOpen);
    }
    if (clientNameContactOpen && clientCpf) {
      setClientNameContactOpen(!clientNameContactOpen);
      setClientCpfOpen(!clientCpfOpen);
    }
    if (clientEmailOpen) {
      setClientEmailOpen(!clientEmailOpen);
      setClientNameContactOpen(!clientNameContactOpen);
    }
    if (clientPhoneOpen) {
      setClientPhoneOpen(!clientPhoneOpen);
      setClientEmailOpen(!clientEmailOpen);
    }
    if (clientMobilePhoneOpen) {
      setClientMobilePhoneOpen(!clientMobilePhoneOpen);
      setClientPhoneOpen(!clientPhoneOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setClientMobilePhoneOpen(!clientMobilePhoneOpen);
    }
  }, [
    clientNameOpen,
    clientName.name,
    clientCnpj,
    clientCpf,
    clientNameContact,
    clientEmail,
    clientPhone,
    clientMobilePhone,
    clientCnpjOpen,
    clientCpfOpen,
    clientNameContactOpen,
    clientEmailOpen,
    clientPhoneOpen,
    clientMobilePhoneOpen,
    confirmDataOpen,
  ]);

  const handleChangeToNextQuestion = useCallback(() => {
    if (clientNameOpen && clientName.name && clientCnpj) {
      setClientNameOpen(!clientNameOpen);
      setClientCnpjOpen(!clientCnpjOpen);
    }
    if (clientNameOpen && clientName.name && clientCpf) {
      setClientNameOpen(!clientNameOpen);
      setClientCpfOpen(!clientCpfOpen);
    }
    if (clientCnpjOpen && !clientCnpj) {
      setClientCnpjOpen(!clientCnpjOpen);
      setClientCpfOpen(!clientCpfOpen);
    }
    if (clientCnpjOpen && clientCnpj) {
      setClientCnpjOpen(!clientCnpjOpen);
      setClientNameContactOpen(!clientNameContactOpen);
    }
    if (clientCpfOpen && clientCpf) {
      setClientCpfOpen(!clientCpfOpen);
      setClientNameContactOpen(!clientNameContactOpen);
    }
    if (clientNameContactOpen && clientNameContact) {
      setClientNameContactOpen(!clientNameContactOpen);
      setClientEmailOpen(!clientEmailOpen);
    }
    if (clientEmailOpen && clientEmail) {
      setClientEmailOpen(!clientEmailOpen);
      setClientPhoneOpen(!clientPhoneOpen);
    }
    if (clientPhoneOpen) {
      setClientPhoneOpen(!clientPhoneOpen);
      setClientMobilePhoneOpen(!clientMobilePhoneOpen);
    }
    if (clientMobilePhoneOpen && (clientMobilePhone || clientPhoneOpen)) {
      setClientMobilePhoneOpen(!clientMobilePhoneOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (confirmDataOpen && clientName.name) {
      setConfirmDataOpen(!confirmDataOpen);
      setClientNameOpen(!clientNameOpen);
    }
  }, [
    clientNameOpen,
    clientName.name,
    clientCnpjOpen,
    clientCpfOpen,
    clientCpf,
    clientCnpj,
    clientNameContactOpen,
    clientNameContact,
    clientEmailOpen,
    clientEmail,
    clientPhoneOpen,
    clientMobilePhoneOpen,
    clientMobilePhone,
    confirmDataOpen,
  ]);

  // This function clear answer when field is empty
  useEffect(() => {
    if (!clientName.name) {
      setCounterAnswers((state) => state.filter((e) => e !== 'clientName'));
    }
  }, [clientName]);

  // Monitor keyboard events
  const eventKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'PageUp') {
        handleChangeToPreviousQuestion();
      }
      if (event.key === 'PageDown') {
        handleChangeToNextQuestion();
      }
    },
    [handleChangeToPreviousQuestion, handleChangeToNextQuestion]
  );
  document.onkeydown = eventKeyPress;

  const eventEnterPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Enter' && confirmDataOpen) {
        handleSubmitForm();
      }
    },
    [confirmDataOpen, handleSubmitForm]
  );

  if (confirmDataOpen) {
    setTimeout(() => {
      document.onkeydown = eventEnterPress;
    }, 10);
  }

  const InputWithCNPJMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="99.999.999/9999-99"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithCPFMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="999.999.999-99"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithPhoneMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="(99) 9999-9999"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithMobilePhoneMask = useCallback(
    (props: InputProps): JSX.Element => {
      return (
        <InputMask
          {...props}
          mask="(99) 9 9999-9999"
          maskChar={null}
          style={{ border: 'none' }}
        />
      );
    },
    []
  );

  return (
    <NewOrderOverlap>
      {orderOpen && orderId && (
        <Order
          color={color}
          order_id={orderId}
          from="Comercial"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          updateSearchResults={() => {}}
        />
      )}
      <HeaderButton
        show={newOrderOpen}
        handleClick={(e) => overlapNewOrderOpen(!e)}
        type="button"
        icon={FaTimes}
        color={color}
      />
      <ThemeProvider theme={newOrderMaterialTheme}>
        <Container>
          <Content color={color}>
            {clientNameOpen && clients && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsClientName clientNameOpen={clientNameOpen}>
                  <AskTitle>
                    <div>
                      <span>1</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual a <strong>razão social</strong> do cliente?
                    </div>
                  </AskTitle>
                  <Autocomplete
                    openText=""
                    clearText=""
                    clearOnBlur={false}
                    value={clientName}
                    onChange={(event, newClientName) => {
                      if (newClientName && newClientName.inputValue) {
                        setClientName({
                          ...clientName,
                          name: newClientName.inputValue,
                        });
                      } else if (newClientName) {
                        handleFinishForm(newClientName);
                      }
                      if (!newClientName) {
                        setClientName({} as ClientData);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params) as ClientData[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                          cpf_cnpj: '',
                          contact_name: '',
                          phone: '',
                        });
                      }

                      return filtered;
                    }}
                    options={clients}
                    noOptionsText=""
                    getOptionLabel={({ name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return name;
                    }}
                    renderInput={(params) => (
                      <OriginalTextField
                        name="clientName"
                        autoFocus
                        autoComplete="off"
                        placeholder="Escreva ou selecione uma opção"
                        helperText=" "
                        {...params}
                      />
                    )}
                    renderOption={({ name }, { inputValue }) => {
                      const matches = match(name, inputValue);
                      const parts = parse(name, matches);

                      return (
                        <div>
                          {parts.map(({ highlight, text }) => (
                            <span
                              key={text}
                              style={{ fontWeight: highlight ? 700 : 400 }}
                            >
                              {text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {clientName.name ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitClientName}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          pressione <strong>ENTER</strong>
                        </span>
                        <span>↵</span>
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsClientName>
              </form>
            )}
            {clientCnpjOpen && (
              <Form
                ref={clientCnpjRef}
                className="individual-form"
                onSubmit={handleSubmitClientCnpj}
              >
                <WhatIsClientCnpj clientCnpjOpen={clientCnpjOpen}>
                  <AskTitle>
                    <div>
                      <span>2</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>CNPJ</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientCnpj-input"
                    name="clientCnpjData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientCnpj}
                    InputProps={{
                      inputComponent: InputWithCNPJMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientCnpj>
              </Form>
            )}
            {clientCpfOpen && (
              <Form
                ref={clientCpfRef}
                className="individual-form"
                onSubmit={handleSubmitClientCpf}
              >
                <WhatIsClientCpf clientCpfOpen={clientCpfOpen}>
                  <AskTitle>
                    <div>
                      <span>2</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>CPF</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientCpf-input"
                    name="clientCpfData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientCpf}
                    InputProps={{
                      inputComponent: InputWithCPFMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientCpf>
              </Form>
            )}
            {clientNameContactOpen && (
              <Form
                ref={clientNameContactRef}
                onSubmit={handleSubmitClientNameContact}
                className="individual-form"
              >
                <WhatIsClientNameContact
                  clientNameContactOpen={clientNameContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>3</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>nome</strong> do responsável?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientNameContact-input"
                    name="clientNameContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientNameContact}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientNameContact>
              </Form>
            )}
            {clientEmailOpen && (
              <Form
                ref={clientEmailRef}
                onSubmit={handleSubmitClientEmail}
                className="individual-form"
              >
                <WhatIsClientEmail clientEmailOpen={clientEmailOpen}>
                  <AskTitle>
                    <div>
                      <span>4</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>e-mail</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientEmail-input"
                    name="clientEmailData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientEmail}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientEmail>
              </Form>
            )}
            {clientPhoneOpen && (
              <Form
                ref={clientPhoneRef}
                onSubmit={handleSubmitClientPhone}
                className="individual-form"
              >
                <WhatIsClientPhone clientPhoneOpen={clientPhoneOpen}>
                  <AskTitle>
                    <div>
                      <span>5</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone fixo</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientPhone-input"
                    name="clientPhoneData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientPhone}
                    InputProps={{
                      inputComponent: InputWithPhoneMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientPhone>
              </Form>
            )}
            {clientMobilePhoneOpen && (
              <Form
                ref={clientMobilePhoneRef}
                onSubmit={handleSubmitClientMobilePhone}
                className="individual-form"
              >
                <WhatIsClientMobilePhone
                  clientMobilePhoneOpen={clientMobilePhoneOpen}
                >
                  <AskTitle>
                    <div>
                      <span>6</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone celular</strong> do responsável?
                    </div>
                  </AskTitle>
                  <TextField
                    id="clientMobilePhone-input"
                    name="clientMobilePhoneData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={clientMobilePhone}
                    InputProps={{
                      inputComponent: InputWithMobilePhoneMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsClientMobilePhone>
              </Form>
            )}
          </Content>
          <Footer>
            <Progress color={color} counterAnswers={counterAnswers.length}>
              <span>{counterAnswers.length} de 6 respondidas</span>
              <div className="progress-bar" />
              <div className="bg-progress-bar" />
            </Progress>
            <ButtonsControl color={color}>
              <button type="button" onClick={handleChangeToPreviousQuestion}>
                <FiChevronUp />
              </button>
              <button type="button" onClick={handleChangeToNextQuestion}>
                <FiChevronDown />
              </button>
            </ButtonsControl>
          </Footer>
          {confirmDataOpen && (
            <ConfirmData confirmDataOpen={confirmDataOpen} color={color}>
              <QuestionData>
                <QuestionsContainer>
                  <p>Razão Social: </p>
                  {clientCnpj && <p>CNPJ: </p>}
                  {clientCpf && <p>CPF: </p>}
                  <p>Nome do responsável: </p>
                  <p>E-mail do responsável: </p>
                  {clientPhone && <p>Telefone da empresa: </p>}
                  {clientMobilePhone && <p>Telefone do responsável: </p>}
                </QuestionsContainer>
                <AnswersContainer>
                  <p>{clientName.name}</p>
                  <p>{clientCnpj || clientCpf}</p>
                  <p>{clientNameContact}</p>
                  <p>{clientEmail}</p>
                  {clientPhone && <p>{clientPhone}</p>}
                  {clientMobilePhone && <p>{clientMobilePhone}</p>}
                </AnswersContainer>
              </QuestionData>
              <SubmitFormButton>
                <Button onClick={handleSubmitForm}>Criar pedido</Button>
                <div>
                  <span>
                    pressione <strong>ENTER</strong>
                  </span>
                  <span>↵</span>
                </div>
              </SubmitFormButton>
            </ConfirmData>
          )}
        </Container>
      </ThemeProvider>
    </NewOrderOverlap>
  );
};

export default NewOrder;
