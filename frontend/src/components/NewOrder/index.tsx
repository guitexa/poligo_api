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

import { OrderDataType, UpdateSearchResultsData } from '../SearchResults';

import {
  NewOrderOverlap,
  Container,
  Content,
  AskTitle,
  WhatIsCompanyName,
  WhatIsCompanyCnpj,
  WhatIsCompanyCpf,
  WhatIsCompanyNameContact,
  WhatIsCompanyEmail,
  WhatIsCompanyMobilePhone,
  WhatIsCompanyPhone,
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

interface CompanyState {
  inputValue?: string;
  company_name: string;
  cpf_cnpj: string;
  contact_name: string;
  email?: string;
  phone: string;
  mobile?: string;
}

interface InputData {
  companyCnpjData: string;
  companyCpfData: string;
  companyNameContactData: string;
  companyEmailData: string;
  companyPhoneData: string;
  companyMobilePhoneContactData: string;
}

interface NewOrderProps {
  color: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ color }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [companyName, setCompanyName] = useState<CompanyState>(
    {} as CompanyState
  );
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [companyCpf, setCompanyCpf] = useState('');
  const [companyNameContact, setCompanyNameContact] = useState('');
  const [companyEmail, setCompanyEmail] = useState<string | undefined>('');
  const [companyPhone, setCompanyPhone] = useState<string | undefined>('');
  const [companyMobilePhoneContact, setCompanyMobilePhoneContact] = useState(
    ''
  );

  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCnpjOpen, setCompanyCnpjOpen] = useState(false);
  const [companyCpfOpen, setCompanyCpfOpen] = useState(false);
  const [companyNameContactOpen, setCompanyNameContactOpen] = useState(false);
  const [companyEmailOpen, setCompanyEmailOpen] = useState(false);
  const [companyPhoneOpen, setCompanyPhoneOpen] = useState(false);
  const [
    companyMobilePhoneContactOpen,
    setCompanyMobilePhoneContactOpen,
  ] = useState(false);
  const [confirmDataOpen, setConfirmDataOpen] = useState(false);

  const [counterAnswers, setCounterAnswers] = useState<string[]>([]);
  const [confirmDataHasOpened, setConfirmDataHasOpened] = useState(false);

  const [updateSearchResults, setUpdateSearchResults] = useState<
    UpdateSearchResultsData | undefined
  >({} as UpdateSearchResultsData);

  const { addToast } = useToast();
  const { user } = useAuth();
  const { newOrderOpen, overlapNewOrderOpen } = useOverlap();

  const companyCnpjRef = useRef<FormHandles>(null);
  const companyCpfRef = useRef<FormHandles>(null);
  const companyNameContactRef = useRef<FormHandles>(null);
  const companyEmailRef = useRef<FormHandles>(null);
  const companyPhoneRef = useRef<FormHandles>(null);
  const companyMobilePhoneContactRef = useRef<FormHandles>(null);

  const defaultMaterialTheme = createMuiTheme({
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

  const filter = createFilterOptions<CompanyState>();

  const companyNames: CompanyState[] = [
    {
      company_name: 'American Express',
      cpf_cnpj: '66201161000151',
      contact_name: 'Marcos Augusto',
      email: 'mail@mail.com',
      phone: '3433158200',
      mobile: '349885576743',
    },
    {
      company_name: 'Anheuser-Busch InBev',
      cpf_cnpj: '08809991605',
      contact_name: 'Marcos Augusto',
      email: 'mail@mail.com',
      phone: '3433158200',
      mobile: '349885576743',
    },
  ];

  const handleShowData = useCallback(() => {
    setCompanyNameOpen(false);
    setCompanyCnpjOpen(false);
    setCompanyCpfOpen(false);
    setCompanyNameContactOpen(false);
    setCompanyEmailOpen(false);
    setCompanyMobilePhoneContactOpen(false);
    setCompanyPhoneOpen(false);
    setConfirmDataOpen(true);
  }, []);

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName.company_name) {
      setCompanyNameOpen(!companyNameOpen); // Close question opened
      setCompanyCnpjOpen(!companyCnpjOpen); // Open next question

      if (!counterAnswers.find((e) => e === 'companyName')) {
        setCounterAnswers((state) => [...state, 'companyName']); // Set as answered
      }
    }

    if (
      confirmDataHasOpened &&
      (counterAnswers.includes('companyCnpj') ||
        counterAnswers.includes('companyCpf')) &&
      counterAnswers.includes('companyNameContact') &&
      counterAnswers.includes('companyEmail') &&
      (counterAnswers.includes('companyPhone') ||
        counterAnswers.includes('companyMobilePhoneContact'))
    ) {
      handleShowData();
    }
  }, [
    companyName.company_name,
    confirmDataHasOpened,
    counterAnswers,
    companyNameOpen,
    companyCnpjOpen,
    handleShowData,
  ]);

  const handleSubmitCompanyCnpj = useCallback(
    ({ companyCnpjData }: InputData) => {
      if (companyCnpjData) {
        if (isCNPJ(companyCnpjData)) {
          companyCnpjRef.current?.setErrors({});
          setCompanyCnpjOpen(!companyCnpjOpen); // Close question opened
          setCompanyNameContactOpen(!companyNameContactOpen); // Open next question

          setCompanyCnpj(companyCnpjData);

          if (!counterAnswers.find((e) => e === 'companyCnpj')) {
            setCounterAnswers((state) => [...state, 'companyCnpj']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmail') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyCnpjRef.current?.setErrors({
            companyCnpjData: 'CNPJ inválido',
          });
        }
      } else {
        setCompanyCnpjOpen(!companyCnpjOpen); // Close question opened
        setCompanyCpfOpen(!companyCpfOpen); // Close question opened

        setCompanyCnpj('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyCnpj'));
      }
    },
    [
      companyCnpjOpen,
      companyCpfOpen,
      companyNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitCompanyCpf = useCallback(
    ({ companyCpfData }: InputData) => {
      if (companyCpfData) {
        if (isCPF(companyCpfData)) {
          companyCpfRef.current?.setErrors({});
          setCompanyCpfOpen(!companyCpfOpen); // Close question opened
          setCompanyNameContactOpen(!companyNameContactOpen); // Open next question

          setCompanyCpf(companyCpfData);

          if (!counterAnswers.find((e) => e === 'companyCpf')) {
            setCounterAnswers((state) => [...state, 'companyCpf']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmail') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyCpfRef.current?.setErrors({
            companyCpfData: 'CPF inválido',
          });
        }
      } else {
        companyCpfRef.current?.setErrors({
          companyCpfData: 'Favor preencher um CPF, ou CNPJ',
        });
        setCompanyCpf('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyCpf'));
      }
    },
    [
      companyCpfOpen,
      companyNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitCompanyNameContact = useCallback(
    ({ companyNameContactData }: InputData) => {
      if (companyNameContactData) {
        companyNameContactRef.current?.setErrors({});
        setCompanyNameContactOpen(!companyNameContactOpen); // Close question opened
        setCompanyEmailOpen(!companyEmailOpen); // Open next question

        setCompanyNameContact(
          formatToCapitalized(companyNameContactData, {
            trimTrailingWhiteSpaces: false,
          })
        );

        if (!counterAnswers.find((e) => e === 'companyNameContact')) {
          setCounterAnswers((state) => [...state, 'companyNameContact']); // Set as answered
        }

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyEmail') &&
          (counterAnswers.includes('companyPhone') ||
            counterAnswers.includes('companyMobilePhoneContact'))
        ) {
          handleShowData();
        }
      } else {
        companyNameContactRef.current?.setErrors({
          companyNameContactData: 'Favor preencher um nome',
        });
      }
    },
    [
      companyNameContactOpen,
      companyEmailOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyEmail = useCallback(
    ({ companyEmailData }: InputData) => {
      if (companyEmailData) {
        if (isEmail(companyEmailData)) {
          companyEmailRef.current?.setErrors({});
          setCompanyEmailOpen(!companyEmailOpen); // Close question opened
          setCompanyPhoneOpen(!companyPhoneOpen); // Open next question

          setCompanyEmail(companyEmailData);

          if (!counterAnswers.find((e) => e === 'companyEmail')) {
            setCounterAnswers((state) => [...state, 'companyEmail']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyEmailRef.current?.setErrors({
            companyEmailData: 'Favor preencher um e-mail válido',
          });
        }
      } else {
        companyEmailRef.current?.setErrors({
          companyEmailData: 'Favor preencher um e-mail',
        });
      }
    },
    [
      companyEmailOpen,
      companyPhoneOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyPhone = useCallback(
    ({ companyPhoneData }: InputData) => {
      if (companyPhoneData.length > 1) {
        if (isPhone(companyPhoneData)) {
          companyPhoneRef.current?.setErrors({});
          setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Open next question

          setCompanyPhone(companyPhoneData);

          if (!counterAnswers.find((e) => e === 'companyPhone')) {
            setCounterAnswers((state) => [...state, 'companyPhone']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmail')
          ) {
            handleShowData();
          }
        } else {
          companyPhoneRef.current?.setErrors({
            companyPhoneData: 'Favor preencher um telefone fixo válido',
          });
        }
      } else if (companyMobilePhoneContact) {
        setCompanyPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyPhone'));

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyNameContact') &&
          counterAnswers.includes('companyEmail')
        ) {
          handleShowData();
        }
      } else {
        setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
        setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Open next question

        setCompanyPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyPhone'));
      }
    },
    [
      companyMobilePhoneContact,
      companyPhoneOpen,
      companyMobilePhoneContactOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyMobilePhoneContact = useCallback(
    ({ companyMobilePhoneContactData }: InputData) => {
      if (companyMobilePhoneContactData.length > 1) {
        if (isPhone(companyMobilePhoneContactData)) {
          companyMobilePhoneContactRef.current?.setErrors({});
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);

          setCompanyMobilePhoneContact(companyMobilePhoneContactData);

          if (!counterAnswers.find((e) => e === 'companyMobilePhoneContact')) {
            setCounterAnswers((state) => [
              ...state,
              'companyMobilePhoneContact',
            ]); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmail')
          ) {
            handleShowData();
          }
        } else {
          companyMobilePhoneContactRef.current?.setErrors({
            companyMobilePhoneContactData:
              'Favor preencher um telefone celular válido',
          });
        }
      } else if (companyPhone) {
        setCompanyMobilePhoneContact('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'companyMobilePhoneContact')
        );

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyNameContact') &&
          counterAnswers.includes('companyEmail')
        ) {
          handleShowData();
        } else {
          companyMobilePhoneContactRef.current?.setErrors({});
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);
        }
      } else {
        setCompanyMobilePhoneContact('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'companyMobilePhoneContact')
        );
        companyMobilePhoneContactRef.current?.setErrors({
          companyMobilePhoneContactData:
            'Favor preencher um telefone celular, ou fixo',
        });
      }
    },
    [
      companyPhone,
      companyMobilePhoneContactOpen,
      confirmDataOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleFinishForm = useCallback(
    (newCompanyName: CompanyState) => {
      setCompanyName(newCompanyName);

      setCounterAnswers((state) => [...state, 'companyName']); // Set as answered

      const existentCompany = companyNames.find(
        (company) => company.company_name === newCompanyName.company_name
      );

      if (existentCompany) {
        if (existentCompany.cpf_cnpj.length > 11) {
          setCompanyCnpj(existentCompany.cpf_cnpj);
          setCounterAnswers((state) => [...state, 'companyCnpj']); // Set as answered
        } else {
          setCompanyCpf(existentCompany.cpf_cnpj);
          setCounterAnswers((state) => [...state, 'companyCpf']); // Set as answered
        }

        if (existentCompany.contact_name) {
          setCompanyNameContact(existentCompany.contact_name);
          setCounterAnswers((state) => [...state, 'companyNameContact']); // Set as answered
        }

        if (existentCompany.email) {
          setCompanyEmail(existentCompany.email);
          setCounterAnswers((state) => [...state, 'companyEmail']); // Set as answered
        }

        if (existentCompany.phone) {
          setCompanyPhone(existentCompany.phone);
          setCounterAnswers((state) => [...state, 'companyPhone']); // Set as answered
        }

        if (existentCompany.mobile) {
          setCompanyMobilePhoneContact(existentCompany.mobile);
          setCounterAnswers((state) => [...state, 'companyMobilePhoneContact']); // Set as answered
        }

        handleShowData();
      }
    },
    [companyNames, handleShowData]
  );

  const handleSubmitForm = useCallback(() => {
    try {
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
  }, [addToast]);

  const handleChangeToPreviousQuestion = useCallback(() => {
    if (
      companyNameOpen &&
      companyName.company_name &&
      (companyCnpj || companyCpf) &&
      companyNameContact &&
      companyEmail &&
      (companyPhone || companyMobilePhoneContact)
    ) {
      setCompanyNameOpen(!companyNameOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (companyCnpjOpen) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (companyCpfOpen && !companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyCpfOpen && companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (companyNameContactOpen && companyCnpj) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyNameContactOpen && companyCpf) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyEmailOpen) {
      setCompanyEmailOpen(!companyEmailOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyEmailOpen(!companyEmailOpen);
    }
    if (companyMobilePhoneContactOpen) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
  }, [
    companyNameOpen,
    companyName.company_name,
    companyCnpj,
    companyCpf,
    companyNameContact,
    companyEmail,
    companyPhone,
    companyMobilePhoneContact,
    companyCnpjOpen,
    companyCpfOpen,
    companyNameContactOpen,
    companyEmailOpen,
    companyPhoneOpen,
    companyMobilePhoneContactOpen,
    confirmDataOpen,
  ]);

  const handleChangeToNextQuestion = useCallback(() => {
    if (companyNameOpen && companyName.company_name && companyCnpj) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyNameOpen && companyName.company_name && companyCpf) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyCnpjOpen && !companyCnpj) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyCnpjOpen && companyCnpj) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyCpfOpen && companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyNameContactOpen && companyNameContact) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyEmailOpen(!companyEmailOpen);
    }
    if (companyEmailOpen && companyEmail) {
      setCompanyEmailOpen(!companyEmailOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
    if (
      companyMobilePhoneContactOpen &&
      (companyMobilePhoneContact || companyPhoneOpen)
    ) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (confirmDataOpen && companyName.company_name) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
  }, [
    companyNameOpen,
    companyName.company_name,
    companyCnpjOpen,
    companyCpfOpen,
    companyCpf,
    companyCnpj,
    companyNameContactOpen,
    companyNameContact,
    companyEmailOpen,
    companyEmail,
    companyPhoneOpen,
    companyMobilePhoneContactOpen,
    companyMobilePhoneContact,
    confirmDataOpen,
  ]);

  // This function clear answer when field is empty
  useEffect(() => {
    if (!companyName.company_name) {
      setCounterAnswers((state) => state.filter((e) => e !== 'companyName'));
    }
  }, [companyName]);

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
      {orderOpen && (
        <Order
          color={color}
          order_id="bf58aa7e-b8ec-4e18-a026-948f55ef5706"
          from="Comercial"
          updateSearchResults={(e) => setUpdateSearchResults(e)}
        />
      )}
      <HeaderButton
        show={newOrderOpen}
        handleClick={(e) => overlapNewOrderOpen(!e)}
        type="button"
        icon={FaTimes}
        color={color}
      />
      <ThemeProvider theme={defaultMaterialTheme}>
        <Container>
          <Content color={color}>
            {companyNameOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyName companyNameOpen={companyNameOpen}>
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
                    value={companyName}
                    onChange={(event, newCompanyName) => {
                      if (newCompanyName && newCompanyName.inputValue) {
                        setCompanyName({
                          ...companyName,
                          company_name: newCompanyName.inputValue,
                        });
                      } else if (newCompanyName) {
                        handleFinishForm(newCompanyName);
                      }
                      if (!newCompanyName) {
                        setCompanyName({} as CompanyState);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(
                        options,
                        params
                      ) as CompanyState[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          company_name: `Adicionar ${params.inputValue}`,
                          cpf_cnpj: '',
                          contact_name: '',
                          phone: '',
                        });
                      }

                      return filtered;
                    }}
                    options={companyNames}
                    noOptionsText=""
                    getOptionLabel={({ company_name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return company_name;
                    }}
                    renderInput={(params) => (
                      <OriginalTextField
                        name="companyName"
                        autoFocus
                        autoComplete="off"
                        placeholder="Escreva ou selecione uma opção"
                        helperText=" "
                        {...params}
                      />
                    )}
                    renderOption={({ company_name }, { inputValue }) => {
                      const matches = match(company_name, inputValue);
                      const parts = parse(company_name, matches);

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
                  {companyName.company_name ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyName}>
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
                </WhatIsCompanyName>
              </form>
            )}
            {companyCnpjOpen && (
              <Form
                ref={companyCnpjRef}
                className="individual-form"
                onSubmit={handleSubmitCompanyCnpj}
              >
                <WhatIsCompanyCnpj companyCnpjOpen={companyCnpjOpen}>
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
                    id="companyCnpj-input"
                    name="companyCnpjData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyCnpj}
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
                </WhatIsCompanyCnpj>
              </Form>
            )}
            {companyCpfOpen && (
              <Form
                ref={companyCpfRef}
                className="individual-form"
                onSubmit={handleSubmitCompanyCpf}
              >
                <WhatIsCompanyCpf companyCpfOpen={companyCpfOpen}>
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
                    id="companyCpf-input"
                    name="companyCpfData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyCpf}
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
                </WhatIsCompanyCpf>
              </Form>
            )}
            {companyNameContactOpen && (
              <Form
                ref={companyNameContactRef}
                onSubmit={handleSubmitCompanyNameContact}
                className="individual-form"
              >
                <WhatIsCompanyNameContact
                  companyNameContactOpen={companyNameContactOpen}
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
                    id="companyNameContact-input"
                    name="companyNameContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyNameContact}
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
                </WhatIsCompanyNameContact>
              </Form>
            )}
            {companyEmailOpen && (
              <Form
                ref={companyEmailRef}
                onSubmit={handleSubmitCompanyEmail}
                className="individual-form"
              >
                <WhatIsCompanyEmail companyEmailOpen={companyEmailOpen}>
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
                    id="companyEmail-input"
                    name="companyEmailData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyEmail}
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
                </WhatIsCompanyEmail>
              </Form>
            )}
            {companyPhoneOpen && (
              <Form
                ref={companyPhoneRef}
                onSubmit={handleSubmitCompanyPhone}
                className="individual-form"
              >
                <WhatIsCompanyPhone companyPhoneOpen={companyPhoneOpen}>
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
                    id="companyPhone-input"
                    name="companyPhoneData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyPhone}
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
                </WhatIsCompanyPhone>
              </Form>
            )}
            {companyMobilePhoneContactOpen && (
              <Form
                ref={companyMobilePhoneContactRef}
                onSubmit={handleSubmitCompanyMobilePhoneContact}
                className="individual-form"
              >
                <WhatIsCompanyMobilePhone
                  companyMobilePhoneContactOpen={companyMobilePhoneContactOpen}
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
                    id="companyMobilePhoneContact-input"
                    name="companyMobilePhoneContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyMobilePhoneContact}
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
                </WhatIsCompanyMobilePhone>
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
                  {companyCnpj && <p>CNPJ: </p>}
                  {companyCpf && <p>CPF: </p>}
                  <p>Nome do responsável: </p>
                  <p>E-mail do responsável: </p>
                  {companyPhone && <p>Telefone da empresa: </p>}
                  {companyMobilePhoneContact && (
                    <p>Telefone do responsável: </p>
                  )}
                </QuestionsContainer>
                <AnswersContainer>
                  <p>{companyName.company_name}</p>
                  <p>{companyCnpj || companyCpf}</p>
                  <p>{companyNameContact}</p>
                  <p>{companyEmail}</p>
                  {companyPhone && <p>{companyPhone}</p>}
                  {companyMobilePhoneContact && (
                    <p>{companyMobilePhoneContact}</p>
                  )}
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
