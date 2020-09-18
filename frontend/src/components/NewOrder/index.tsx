import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
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
import { isCNPJ, isCPF, isPhone } from 'brazilian-values';
import isEmail from 'validator/es/lib/isEmail';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min';

import EnterIcon from '../../assets/icons/icon-enter.svg';

import { useToast } from '../../hooks/toast';

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
  WhatIsCompanyPhoneContact,
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

interface NewOrderProps {
  color: string;
}

interface CompanyNameState {
  inputValue?: string;
  name: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ color }) => {
  const [companyName, setCompanyName] = useState<CompanyNameState | null>(null);
  const [companyCpfCnpj, setCompanyCpfCnpj] = useState('');
  const [companyNameContact, setCompanyNameContact] = useState('');
  const [companyEmailContact, setCompanyEmailContact] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyPhoneContact, setCompanyPhoneContact] = useState('');

  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCpfCnpjOpen, setCompanyCpfCnpjOpen] = useState(false);
  const [companyNameContactOpen, setCompanyNameContactOpen] = useState(false);
  const [companyEmailContactOpen, setCompanyEmailContactOpen] = useState(false);
  const [companyPhoneOpen, setCompanyPhoneOpen] = useState(false);
  const [companyPhoneContactOpen, setCompanyPhoneContactOpen] = useState(false);
  const [confirmDataOpen, setConfirmDataOpen] = useState(false);

  const [isCompanyCpfValid, setIsCompanyCpfValid] = useState<boolean | null>(
    null
  );
  const [isCompanyCnpjValid, setIsCompanyCnpjValid] = useState<boolean | null>(
    null
  );
  const [isCompanyEmailContactValid, setIsCompanyEmailContactValid] = useState(
    true
  );
  const [isCompanyPhoneContactValid, setIsCompanyPhoneContactValid] = useState(
    true
  );
  const [isCompanyPhoneValid, setIsCompanyPhoneValid] = useState(true);

  const [counterAnswers, setCounterAnswers] = useState(0);

  const { addToast } = useToast();

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName && companyNameOpen) {
      setCompanyNameOpen(!companyNameOpen); // Close question opened
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Open next question

      if (counterAnswers !== 6) {
        setCounterAnswers(counterAnswers + 1); // Set as answered
      }

      if (counterAnswers >= 5) {
        setCompanyNameOpen(false);
        setCompanyCpfCnpjOpen(false);
        setCompanyNameContactOpen(false);
        setCompanyEmailContactOpen(false);
        setCompanyPhoneContactOpen(false);
        setCompanyPhoneOpen(false);
        setConfirmDataOpen(true);
      }
    }
  }, [companyName, companyNameOpen, companyCpfCnpjOpen, counterAnswers]);

  const handleSubmitCompanyCpfCnpj = useCallback(() => {
    if (companyCpfCnpj !== '' && companyCpfCnpjOpen) {
      if (isCNPJ(companyCpfCnpj)) {
        setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Close question opened
        setCompanyNameContactOpen(!companyNameContactOpen); // Open next question
        setIsCompanyCnpjValid(true);

        if (isCompanyCpfValid === true) {
          setIsCompanyCpfValid(false);
        }

        if (counterAnswers !== 6) {
          setCounterAnswers(counterAnswers + 1); // Set as answered
        }

        if (counterAnswers >= 5) {
          setCompanyNameOpen(false);
          setCompanyCpfCnpjOpen(false);
          setCompanyNameContactOpen(false);
          setCompanyEmailContactOpen(false);
          setCompanyPhoneContactOpen(false);
          setCompanyPhoneOpen(false);
          setConfirmDataOpen(true);
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

        if (counterAnswers !== 6) {
          setCounterAnswers(counterAnswers + 1); // Set as answered
        }

        if (counterAnswers >= 5) {
          setCompanyNameOpen(false);
          setCompanyCpfCnpjOpen(false);
          setCompanyNameContactOpen(false);
          setCompanyEmailContactOpen(false);
          setCompanyPhoneContactOpen(false);
          setCompanyPhoneOpen(false);
          setConfirmDataOpen(true);
        }
      } else if (companyCpfCnpj.length <= 14) {
        setIsCompanyCpfValid(false);
        setIsCompanyCnpjValid(null);
      }
    }
  }, [
    companyCpfCnpj,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    counterAnswers,
    isCompanyCnpjValid,
    isCompanyCpfValid,
  ]);

  const handleSubmitCompanyNameContact = useCallback(() => {
    if (companyNameContact && companyNameContactOpen) {
      setCompanyNameContactOpen(!companyNameContactOpen); // Close question opened
      setCompanyEmailContactOpen(!companyEmailContactOpen); // Open next question

      if (counterAnswers !== 6) {
        setCounterAnswers(counterAnswers + 1); // Set as answered
      }

      if (counterAnswers >= 5) {
        setCompanyNameOpen(false);
        setCompanyCpfCnpjOpen(false);
        setCompanyNameContactOpen(false);
        setCompanyEmailContactOpen(false);
        setCompanyPhoneContactOpen(false);
        setCompanyPhoneOpen(false);
        setConfirmDataOpen(true);
      }
    }
  }, [
    companyNameContact,
    companyNameContactOpen,
    companyEmailContactOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyEmailContact = useCallback(() => {
    if (companyEmailContact && companyEmailContactOpen) {
      if (isEmail(companyEmailContact)) {
        setCompanyEmailContactOpen(!companyEmailContactOpen); // Close question opened
        setCompanyPhoneContactOpen(!companyPhoneContactOpen); // Open next question
        setIsCompanyEmailContactValid(true);

        if (counterAnswers !== 6) {
          setCounterAnswers(counterAnswers + 1); // Set as answered
        }

        if (counterAnswers >= 5) {
          setCompanyNameOpen(false);
          setCompanyCpfCnpjOpen(false);
          setCompanyNameContactOpen(false);
          setCompanyEmailContactOpen(false);
          setCompanyPhoneContactOpen(false);
          setCompanyPhoneOpen(false);
          setConfirmDataOpen(true);
        }
      } else {
        setIsCompanyEmailContactValid(false);
      }
    }
  }, [
    companyEmailContact,
    companyEmailContactOpen,
    companyPhoneContactOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyPhoneContact = useCallback(() => {
    if (companyPhoneContact && companyPhoneContactOpen) {
      if (isPhone(companyPhoneContact)) {
        setCompanyPhoneContactOpen(!companyPhoneContactOpen); // Close question opened
        setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
        setIsCompanyPhoneContactValid(true);

        if (counterAnswers !== 6) {
          setCounterAnswers(counterAnswers + 1); // Set as answered
        }

        if (counterAnswers >= 5) {
          setCompanyNameOpen(false);
          setCompanyCpfCnpjOpen(false);
          setCompanyNameContactOpen(false);
          setCompanyEmailContactOpen(false);
          setCompanyPhoneContactOpen(false);
          setCompanyPhoneOpen(false);
          setConfirmDataOpen(true);
        }
      } else {
        setIsCompanyPhoneContactValid(false);
      }
    }
  }, [
    companyPhoneContact,
    companyPhoneContactOpen,
    companyPhoneOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyPhone = useCallback(() => {
    if (companyPhone && companyPhoneOpen) {
      if (isPhone(companyPhone)) {
        setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
        setCompanyNameOpen(!companyNameOpen); // Open next question
        setIsCompanyPhoneValid(true);

        if (counterAnswers !== 6) {
          setCounterAnswers(counterAnswers + 1); // Set as answered
        }

        if (counterAnswers >= 5) {
          setCompanyNameOpen(false);
          setCompanyCpfCnpjOpen(false);
          setCompanyNameContactOpen(false);
          setCompanyEmailContactOpen(false);
          setCompanyPhoneContactOpen(false);
          setCompanyPhoneOpen(false);
          setConfirmDataOpen(true);
        }
      } else {
        setIsCompanyPhoneValid(false);
      }
    }
  }, [companyPhone, companyPhoneOpen, companyNameOpen, counterAnswers]);

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

  // This function clear errors when field is empty
  useEffect(() => {
    if (companyCpfCnpj === '') {
      setIsCompanyCpfValid(null);
      setIsCompanyCnpjValid(null);
    }
    if (companyEmailContact === '') {
      setIsCompanyEmailContactValid(true);
    }
    if (companyPhoneContact === '') {
      setIsCompanyPhoneContactValid(true);
    }
    if (companyPhone === '') {
      setIsCompanyPhoneValid(true);
    }
  }, [companyCpfCnpj, companyEmailContact, companyPhoneContact, companyPhone]);

  const forceFocusOnInputField = useCallback((id: string): void => {
    const getElement = document.getElementById(id);

    if (getElement !== null) {
      getElement.focus();
    }
  }, []);

  $('#companyPhoneContact-input').mask('(00) 0000-0000');

  $('#companyPhone-input').mask('(00) 9 0000-0000');

  $('#companyCpfCnpj-input').mask('00.000.000/0000-00', {
    onKeyPress(value: string): void {
      const mask = value.length > 14 ? '00.000.000/0000-00' : '000.000.000-00';
      $('#companyCpfCnpj-input').mask(mask);
    },
  });

  const handleChangeToPreviousQuestion = useCallback(() => {
    if (companyNameOpen) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
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
    if (companyPhoneContactOpen) {
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
    }
  }, [
    companyNameOpen,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    companyEmailContactOpen,
    companyPhoneOpen,
    companyPhoneContactOpen,
    confirmDataOpen,
  ]);

  const handleChangeToNextQuestion = useCallback(() => {
    if (companyNameOpen) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
    }
    if (companyCpfCnpjOpen) {
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyNameContactOpen) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyEmailContactOpen) {
      setCompanyEmailContactOpen(!companyEmailContactOpen);
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
    }
    if (companyPhoneContactOpen) {
      setCompanyPhoneContactOpen(!companyPhoneContactOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
  }, [
    companyNameOpen,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    companyEmailContactOpen,
    companyPhoneContactOpen,
    companyPhoneOpen,
    confirmDataOpen,
  ]);

  const handleSubmitForm = useCallback(() => {
    addToast({
      type: 'success',
      description: 'Pedido criado com sucesso!',
    });
  }, [addToast]);

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
                    } else {
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
                {companyName?.name ? (
                  <SubmitQuestionButton>
                    <Button onClick={handleSubmitCompanyName}>Continuar</Button>
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
                          : isCompanyCnpjValid !== null &&
                            isCompanyCnpjValid !== true
                          ? 'CNPJ inválido'
                          : ' '
                      }
                      value={companyCpfCnpj}
                      onChange={(e) => setCompanyCpfCnpj(e.target.value)}
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
                    Qual o <strong>email</strong> do responsável?
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
                      error={!isCompanyEmailContactValid}
                      helperText={
                        !isCompanyEmailContactValid ? 'E-mail inválido' : ' '
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
          {companyPhoneContactOpen && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="individual-form"
            >
              <WhatIsCompanyPhoneContact
                companyPhoneContactOpen={companyPhoneContactOpen}
              >
                <AskTitle>
                  <div>
                    <span>5</span>
                    <FiArrowRight />
                  </div>
                  <div>
                    Qual o <strong>telefone fixo</strong> do cliente?
                  </div>
                </AskTitle>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      id="companyPhoneContact-input"
                      name="companyPhoneContact"
                      autoFocus
                      autoComplete="off"
                      placeholder="Digite aqui"
                      error={!isCompanyPhoneContactValid}
                      helperText={
                        !isCompanyPhoneContactValid ? 'Telefone inválido' : ' '
                      }
                      value={companyPhoneContact}
                      onChange={(e) => setCompanyPhoneContact(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    {companyPhoneContact && (
                      <IconButton
                        onClick={() => {
                          setCompanyPhoneContact('');
                          forceFocusOnInputField('companyPhoneContact-input');
                        }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {companyPhoneContact !== '' ? (
                  <SubmitQuestionButton>
                    <Button onClick={handleSubmitCompanyPhoneContact}>
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
              </WhatIsCompanyPhoneContact>
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
                    Qual o <strong>telefone celular</strong> do responsável?
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
                      error={!isCompanyPhoneValid}
                      helperText={
                        !isCompanyPhoneValid ? 'Telefone inválido' : ' '
                      }
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
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
        {!confirmDataOpen && (
          <Footer>
            <Progress color={color} counterAnswers={counterAnswers}>
              <span>{counterAnswers} de 6 respondidas</span>
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
        )}
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
                <p>{companyName?.name}</p>
                <p>{companyCpfCnpj}</p>
                <p>{companyNameContact}</p>
                <p>{companyEmailContact}</p>
                <p>{companyPhone}</p>
                <p>{companyPhoneContact}</p>
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
  );
};

export default NewOrder;
