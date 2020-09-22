import React, { useCallback, useState, useEffect } from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import {
  ThemeProvider,
  createMuiTheme,
  Grid,
  TextField,
  IconButton,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Close } from '@material-ui/icons';
import {
  isCNPJ,
  isCPF,
  isPhone,
  formatToPhone,
  formatToCPFOrCNPJ,
} from 'brazilian-values';
import isEmail from 'validator/es/lib/isEmail';

import EnterIcon from '../../assets/icons/icon-enter.svg';

import { useToast } from '../../hooks/toast';

import Order from '../Order';
import Button from '../Button';
import DisabledButton from '../DisabledButton';

import {
  Container,
  Content,
  AskTitle,
  WhatIsCompanyName,
  WhatIsCompanyCpfCnpj,
  WhatIsCompanyNameContact,
  WhatIsCompanyEmailContact,
  WhatIsCompanyMobilePhoneContact,
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

interface CompanyNameState {
  inputValue?: string;
  name: string;
}

interface NewOrderProps {
  color: string;
  newServiceOpen: boolean;
  setNewServiceOpen(e: boolean): void;
}

const NewOrder: React.FC<NewOrderProps> = ({
  color,
  newServiceOpen,
  setNewServiceOpen,
}) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [companyName, setCompanyName] = useState<CompanyNameState>(
    {} as CompanyNameState
  );
  const [companyCpfCnpj, setCompanyCpfCnpj] = useState('');
  const [companyNameContact, setCompanyNameContact] = useState('');
  const [companyEmailContact, setCompanyEmailContact] = useState('');
  const [companyMobilePhoneContact, setCompanyMobilePhoneContact] = useState(
    ''
  );
  const [companyPhone, setCompanyPhone] = useState('');

  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCpfCnpjOpen, setCompanyCpfCnpjOpen] = useState(false);
  const [companyNameContactOpen, setCompanyNameContactOpen] = useState(false);
  const [companyEmailContactOpen, setCompanyEmailContactOpen] = useState(false);
  const [
    companyMobilePhoneContactOpen,
    setCompanyMobilePhoneContactOpen,
  ] = useState(false);
  const [companyPhoneOpen, setCompanyPhoneOpen] = useState(false);
  const [confirmDataOpen, setConfirmDataOpen] = useState(false);

  const [isCompanyCpfValid, setIsCompanyCpfValid] = useState<boolean | null>(
    null
  );
  const [isCompanyCnpjValid, setIsCompanyCnpjValid] = useState<boolean | null>(
    null
  );
  const [isCompanyEmailContactValid, setIsCompanyEmailContactValid] = useState<
    boolean | null
  >(null);
  const [
    isCompanyMobilePhoneContactValid,
    setIsCompanyMobilePhoneContactValid,
  ] = useState<boolean | null>(null);
  const [isCompanyPhoneValid, setIsCompanyPhoneValid] = useState<
    boolean | null
  >(null);

  const [counterAnswers, setCounterAnswers] = useState<string[]>([]);

  const { addToast } = useToast();

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

  const filter = createFilterOptions<CompanyNameState>();

  const companyNames: CompanyNameState[] = [
    {
      name: 'Distribuidora Triangulina de Veículos Ltda',
    },
    {
      name: 'Hidrovacuo Saneamento LTDA',
    },
    {
      name: 'Carré - Arte em Mármore e Granito Ltda',
    },
    {
      name: 'Mariangela Borges Alves',
    },
    {
      name: 'Ergosafety',
    },
    {
      name: 'Resolv Prestadora de Serviços Ltda',
    },
    {
      name: 'Arko Industria e Comercio de Mineração e Fertilizant...',
    },
    {
      name: 'Arko Industria e Comercio de Mineração e Fertilizant...',
    },
    {
      name: 'RCM Engenharia e Construções',
    },
    {
      name: 'Supermotos',
    },
    {
      name: 'Empreiteira Cristal Ltda',
    },
    {
      name: 'Arko Industria e Comercio de Mineração e Fertilizant...',
    },
    {
      name: 'Rocha Serviços de Limpeza Profissional Eireli',
    },
    {
      name: 'Ergosafety Segurança do Trabalho LTDA',
    },
    {
      name: 'Montana Andaimes',
    },
    {
      name: 'Composite',
    },
    {
      name: 'Carré - Arte em Mármore e Granito Ltda',
    },
  ];

  const handleShowData = useCallback(() => {
    if (
      (counterAnswers.includes('companyName') &&
        counterAnswers.includes('companyCpfCnpj') &&
        counterAnswers.includes('companyNameContact') &&
        counterAnswers.includes('companyEmailContact') &&
        counterAnswers.includes('companyPhone')) ||
      counterAnswers.includes('companyMobilePhoneContact')
    ) {
      setCompanyNameOpen(false);
      setCompanyCpfCnpjOpen(false);
      setCompanyNameContactOpen(false);
      setCompanyEmailContactOpen(false);
      setCompanyMobilePhoneContactOpen(false);
      setCompanyPhoneOpen(false);
      setConfirmDataOpen(true);
    }
  }, [counterAnswers]);

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName.name) {
      setCompanyNameOpen(!companyNameOpen); // Close question opened
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Open next question

      if (!counterAnswers.find((e) => e === 'companyName')) {
        setCounterAnswers((state) => [...state, 'companyName']); // Set as answered
      }
    }

    handleShowData();
  }, [
    companyName,
    handleShowData,
    companyNameOpen,
    companyCpfCnpjOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyCpfCnpj = useCallback(() => {
    if (companyCpfCnpj) {
      if (isCNPJ(companyCpfCnpj)) {
        setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Close question opened
        setCompanyNameContactOpen(!companyNameContactOpen); // Open next question
        setIsCompanyCnpjValid(true);

        if (isCompanyCpfValid === true) {
          setIsCompanyCpfValid(false);
        }

        if (!counterAnswers.find((e) => e === 'companyCpfCnpj')) {
          setCounterAnswers((state) => [...state, 'companyCpfCnpj']); // Set as answered
        }
      } else if (companyCpfCnpj.length > 14) {
        setIsCompanyCnpjValid(false);
        setIsCompanyCpfValid(null);
      }

      if (isCPF(companyCpfCnpj)) {
        setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Close question opened
        setCompanyNameContactOpen(!companyNameContactOpen); // Open next question
        setIsCompanyCpfValid(true);

        if (isCompanyCnpjValid === true) {
          setIsCompanyCnpjValid(false);
        }

        if (!counterAnswers.find((e) => e === 'companyCpfCnpj')) {
          setCounterAnswers((state) => [...state, 'companyCpfCnpj']); // Set as answered
        }
      } else if (companyCpfCnpj.length <= 14) {
        setIsCompanyCpfValid(false);
        setIsCompanyCnpjValid(null);
      }
    }

    handleShowData();
  }, [
    companyCpfCnpj,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    counterAnswers,
    handleShowData,
    isCompanyCnpjValid,
    isCompanyCpfValid,
  ]);

  const handleSubmitCompanyNameContact = useCallback(() => {
    if (companyNameContact && companyNameContactOpen) {
      setCompanyNameContactOpen(!companyNameContactOpen); // Close question opened
      setCompanyEmailContactOpen(!companyEmailContactOpen); // Open next question

      if (!counterAnswers.find((e) => e === 'companyNameContact')) {
        setCounterAnswers((state) => [...state, 'companyNameContact']); // Set as answered
      }
    }

    handleShowData();
  }, [
    companyNameContact,
    companyNameContactOpen,
    handleShowData,
    companyEmailContactOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyEmailContact = useCallback(() => {
    if (companyEmailContact && companyEmailContactOpen) {
      if (isEmail(companyEmailContact)) {
        setCompanyEmailContactOpen(!companyEmailContactOpen); // Close question opened
        setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Open next question
        setIsCompanyEmailContactValid(true);

        if (!counterAnswers.find((e) => e === 'companyEmailContact')) {
          setCounterAnswers((state) => [...state, 'companyEmailContact']); // Set as answered
        }
      } else {
        setIsCompanyEmailContactValid(false);
      }
    }

    handleShowData();
  }, [
    companyEmailContact,
    companyEmailContactOpen,
    companyMobilePhoneContactOpen,
    counterAnswers,
    handleShowData,
  ]);

  const handleSubmitCompanyMobilePhoneContact = useCallback(() => {
    if (companyMobilePhoneContact) {
      if (isPhone(companyMobilePhoneContact)) {
        setIsCompanyMobilePhoneContactValid(true);

        if (!counterAnswers.find((e) => e === 'companyMobilePhoneContact')) {
          setCounterAnswers((state) => [...state, 'companyMobilePhoneContact']); // Set as answered
        }
      } else {
        setIsCompanyMobilePhoneContactValid(false);
      }
    }

    setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Close question opened
    setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
    handleShowData();
  }, [
    companyMobilePhoneContact,
    companyMobilePhoneContactOpen,
    companyPhoneOpen,
    counterAnswers,
    handleShowData,
  ]);

  const handleSubmitCompanyPhone = useCallback(() => {
    if (companyPhone && companyPhoneOpen) {
      if (isPhone(companyPhone)) {
        setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
        setConfirmDataOpen(!confirmDataOpen); // Open next question
        setIsCompanyPhoneValid(true);

        if (!counterAnswers.find((e) => e === 'companyPhone')) {
          setCounterAnswers((state) => [...state, 'companyPhone']); // Set as answered
        }
      } else {
        setIsCompanyPhoneValid(false);
      }
    }

    handleShowData();
  }, [
    companyPhone,
    companyPhoneOpen,
    handleShowData,
    confirmDataOpen,
    counterAnswers,
  ]);

  const handleSubmitForm = useCallback(() => {
    addToast({
      type: 'success',
      description: 'Pedido criado com sucesso!',
    });
    setConfirmDataOpen(false);
    setOrderOpen(true);
  }, [addToast, setOrderOpen]);

  const handleChangeToPreviousQuestion = useCallback(() => {
    if (
      companyNameOpen &&
      companyName.name &&
      companyCpfCnpj &&
      companyNameContact &&
      companyEmailContact &&
      companyPhone
    ) {
      setCompanyNameOpen(!companyNameOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (companyCpfCnpjOpen) {
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (companyNameContactOpen) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
    }
    if (companyEmailContactOpen) {
      setCompanyEmailContactOpen(!companyEmailContactOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyMobilePhoneContactOpen) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
  }, [
    companyNameOpen,
    companyName,
    companyCpfCnpjOpen,
    companyCpfCnpj,
    companyNameContactOpen,
    companyNameContact,
    companyEmailContactOpen,
    companyEmailContact,
    companyMobilePhoneContactOpen,
    companyPhoneOpen,
    companyPhone,
    confirmDataOpen,
  ]);

  const handleChangeToNextQuestion = useCallback(() => {
    if (companyNameOpen && companyName.name) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
    }
    if (companyCpfCnpjOpen && companyCpfCnpj) {
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyNameContactOpen && companyNameContact) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyEmailContactOpen && companyEmailContact) {
      setCompanyEmailContactOpen(!companyEmailContactOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
    if (companyMobilePhoneContactOpen) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (companyPhoneOpen && companyPhone) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (confirmDataOpen && companyName.name) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
  }, [
    companyNameOpen,
    companyName,
    companyCpfCnpjOpen,
    companyCpfCnpj,
    companyNameContactOpen,
    companyNameContact,
    companyEmailContactOpen,
    companyEmailContact,
    companyMobilePhoneContactOpen,
    companyPhoneOpen,
    companyPhone,
    confirmDataOpen,
  ]);

  const forceFocusOnInputField = useCallback((id: string): void => {
    const getElement = document.getElementById(id);

    if (getElement !== null) {
      getElement.focus();
    }
  }, []);

  // This function clear errors when field is empty
  useEffect(() => {
    if (!companyName.name) {
      setCounterAnswers((state) => state.filter((e) => e !== 'companyName'));
    }
    if (!companyCpfCnpj) {
      setIsCompanyCpfValid(null);
      setIsCompanyCnpjValid(null);
      setCounterAnswers((state) => state.filter((e) => e !== 'companyCpfCnpj'));
    }
    if (!companyNameContact) {
      setCounterAnswers((state) =>
        state.filter((e) => e !== 'companyNameContact')
      );
    }
    if (companyEmailContact === '') {
      setIsCompanyEmailContactValid(null);
      setCounterAnswers((state) =>
        state.filter((e) => e !== 'companyEmailContact')
      );
    }
    if (companyMobilePhoneContact === '') {
      setIsCompanyMobilePhoneContactValid(null);
      setCounterAnswers((state) =>
        state.filter((e) => e !== 'companyMobilePhoneContact')
      );
    }
    if (companyPhone === '') {
      setIsCompanyPhoneValid(true);
      setCounterAnswers((state) => state.filter((e) => e !== 'companyPhone'));
    }
  }, [
    companyCpfCnpj,
    companyEmailContact,
    companyMobilePhoneContact,
    companyName,
    companyNameContact,
    companyPhone,
  ]);

  // Monitor keyboard events
  const eventKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'PageUp') {
        handleChangeToPreviousQuestion();
      }
      if (event.key === 'PageDown') {
        handleChangeToNextQuestion();
      }
      if (event.key === 'Enter' && confirmDataOpen) {
        handleSubmitForm();
      }
    },
    [
      confirmDataOpen,
      handleChangeToPreviousQuestion,
      handleChangeToNextQuestion,
      handleSubmitForm,
    ]
  );
  document.onkeydown = eventKeyPress;

  return (
    <>
      {orderOpen && (
        <Order
          color={color}
          newServiceOpen={newServiceOpen}
          setNewServiceOpen={(e) => setNewServiceOpen(e)}
          companyName={companyName.name}
          companyCpfCnpj={companyCpfCnpj}
          companyNameContact={companyNameContact}
          companyEmailContact={companyEmailContact}
          companyPhone={companyPhone}
          companyMobilePhoneContact={companyMobilePhoneContact || '--'}
        />
      )}
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
                    clearOnBlur={false}
                    value={companyName}
                    onChange={(event, newCompanyName) => {
                      if (newCompanyName && newCompanyName.inputValue) {
                        setCompanyName({
                          name: newCompanyName.inputValue,
                        });
                      } else if (newCompanyName) {
                        setCompanyName(newCompanyName);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(
                        options,
                        params
                      ) as CompanyNameState[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={companyNames}
                    noOptionsText=""
                    getOptionLabel={({ name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return name;
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="companyName"
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
                  {companyName.name ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyName}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          Pressione <strong>ENTER</strong>
                        </span>
                        <img src={EnterIcon} alt="" />
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyName>
              </form>
            )}
            {companyCpfCnpjOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyCpfCnpj companyCpfCnpjOpen={companyCpfCnpjOpen}>
                  <AskTitle>
                    <div>
                      <span>2</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>CNPJ</strong> ou <strong>CPF</strong> do
                      cliente?
                    </div>
                  </AskTitle>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="companyCpfCnpj-input"
                        name="companyCpfCnpj"
                        autoFocus
                        autoComplete="off"
                        placeholder="Digite aqui"
                        error={
                          isCompanyCpfValid === false ||
                          isCompanyCnpjValid === false
                        }
                        helperText={
                          isCompanyCpfValid === false
                            ? 'CPF inválido'
                            : isCompanyCnpjValid === false
                            ? 'CNPJ inválido'
                            : ' '
                        }
                        value={companyCpfCnpj}
                        onChange={(e) => {
                          setCompanyCpfCnpj(formatToCPFOrCNPJ(e.target.value));
                        }}
                      />
                    </Grid>
                    <Grid item>
                      {companyCpfCnpj && (
                        <IconButton
                          onClick={() => {
                            setCompanyCpfCnpj('');
                            forceFocusOnInputField('companyCpfCnpj-input');
                          }}
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {companyCpfCnpj !== '' ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyCpfCnpj}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          Pressione <strong>ENTER</strong>
                        </span>
                        <img src={EnterIcon} alt="" />
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyCpfCnpj>
              </form>
            )}
            {companyNameContactOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
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
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="companyNameContact-input"
                        name="companyNameContact"
                        autoFocus
                        autoComplete="off"
                        placeholder="Digite aqui"
                        helperText=" "
                        value={companyNameContact}
                        onChange={(e) => setCompanyNameContact(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      {companyNameContact && (
                        <IconButton
                          onClick={() => {
                            setCompanyNameContact('');
                            forceFocusOnInputField('companyNameContact-input');
                          }}
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {companyNameContact !== '' ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyNameContact}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          Pressione <strong>ENTER</strong>
                        </span>
                        <img src={EnterIcon} alt="" />
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyNameContact>
              </form>
            )}
            {companyEmailContactOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyEmailContact
                  companyEmailContactOpen={companyEmailContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>4</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>e-mail</strong> do cliente?
                    </div>
                  </AskTitle>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="companyEmailContact-input"
                        name="companyEmailContact"
                        autoFocus
                        autoComplete="off"
                        placeholder="Digite aqui"
                        error={isCompanyEmailContactValid === false}
                        helperText={
                          isCompanyEmailContactValid === false
                            ? 'E-mail inválido'
                            : ' '
                        }
                        value={companyEmailContact}
                        onChange={(e) => setCompanyEmailContact(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      {companyEmailContact && (
                        <IconButton
                          onClick={() => {
                            setCompanyEmailContact('');
                            forceFocusOnInputField('companyEmailContact-input');
                          }}
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {companyEmailContact !== '' ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyEmailContact}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          Pressione <strong>ENTER</strong>
                        </span>
                        <img src={EnterIcon} alt="" />
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyEmailContact>
              </form>
            )}
            {companyMobilePhoneContactOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyMobilePhoneContact
                  companyMobilePhoneContactOpen={companyMobilePhoneContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>5</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone celular</strong> do responsável?
                    </div>
                  </AskTitle>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="companyMobilePhoneContact-input"
                        name="companyMobilePhoneContact"
                        autoFocus
                        autoComplete="off"
                        placeholder="Digite aqui"
                        error={isCompanyMobilePhoneContactValid === false}
                        helperText={
                          isCompanyMobilePhoneContactValid === false
                            ? 'Telefone inválido'
                            : ' '
                        }
                        value={companyMobilePhoneContact}
                        onChange={(e) => {
                          setCompanyMobilePhoneContact(
                            formatToPhone(e.target.value)
                          );
                        }}
                        inputProps={{ maxLength: 16 }}
                      />
                    </Grid>
                    <Grid item>
                      {companyMobilePhoneContact && (
                        <IconButton
                          onClick={() => {
                            setCompanyMobilePhoneContact('');
                            forceFocusOnInputField(
                              'companyMobilePhoneContact-input'
                            );
                            setCounterAnswers((state) =>
                              state.filter(
                                (e) => e !== 'companyMobilePhoneContact'
                              )
                            );
                          }}
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  <SubmitQuestionButton>
                    <Button onClick={handleSubmitCompanyMobilePhoneContact}>
                      Continuar
                    </Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyMobilePhoneContact>
              </form>
            )}
            {companyPhoneOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyPhone companyPhoneOpen={companyPhoneOpen}>
                  <AskTitle>
                    <div>
                      <span>6</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone fixo</strong> do cliente?
                    </div>
                  </AskTitle>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="companyPhone-input"
                        name="companyPhone"
                        autoFocus
                        autoComplete="off"
                        placeholder="Digite aqui"
                        error={isCompanyPhoneValid === false}
                        helperText={
                          isCompanyPhoneValid === false
                            ? 'Telefone inválido'
                            : ' '
                        }
                        value={companyPhone}
                        onChange={(e) => {
                          setCompanyPhone(formatToPhone(e.target.value));
                        }}
                        inputProps={{ maxLength: 14 }}
                      />
                    </Grid>
                    <Grid item>
                      {companyPhone && (
                        <IconButton
                          onClick={() => {
                            setCompanyPhone('');
                            forceFocusOnInputField('companyPhone-input');
                          }}
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {companyPhone !== '' ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyPhone}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          Pressione <strong>ENTER</strong>
                        </span>
                        <img src={EnterIcon} alt="" />
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyPhone>
              </form>
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
                  {isCompanyCnpjValid && <p>CNPJ: </p>}
                  {isCompanyCpfValid && <p>CPF: </p>}
                  <p>Nome do responsável: </p>
                  <p>E-mail do responsável: </p>
                  <p>Telefone da empresa: </p>
                  <p>Telefone do responsável: </p>
                </QuestionsContainer>
                <AnswersContainer>
                  <p>{companyName.name}</p>
                  <p>{companyCpfCnpj}</p>
                  <p>{companyNameContact}</p>
                  <p>{companyEmailContact}</p>
                  <p>{companyPhone}</p>
                  <p>{companyMobilePhoneContact || '--'}</p>
                </AnswersContainer>
              </QuestionData>
              <SubmitFormButton>
                <Button onClick={handleSubmitForm}>Criar pedido</Button>
                <div>
                  <span>
                    Pressione <strong>ENTER</strong>
                  </span>
                  <img src={EnterIcon} alt="" />
                </div>
              </SubmitFormButton>
            </ConfirmData>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default NewOrder;
