import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import {
  ThemeProvider,
  TextField,
  createMuiTheme,
  Grid,
  IconButton,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Close } from '@material-ui/icons';
import { isCNPJ, isCPF, isPhone } from 'brazilian-values';
import isEmail from 'validator/es/lib/isEmail';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min';

import EnterIcon from '../../assets/icons/icon-enter.svg';

import Button from '../Button';
import DisabledButton from '../DisabledButton';

import {
  Container,
  Content,
  AskTitle,
  SubmitQuestion,
  WhatIsCompanyName,
  WhatIsCompanyCpfCnpj,
  WhatIsCompanyNameContact,
  WhatIsCompanyEmailContact,
  WhatIsCompanyPhoneContact,
  Footer,
  Progress,
  ButtonsControl,
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
  const [companyPhoneContact, setCompanyPhoneContact] = useState('');

  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCpfCnpjOpen, setCompanyCpfCnpjOpen] = useState(false);
  const [companyNameContactOpen, setCompanyNameContactOpen] = useState(false);
  const [companyEmailContactOpen, setCompanyEmailContactOpen] = useState(false);
  const [companyPhoneContactOpen, setCompanyPhoneContactOpen] = useState(false);

  const [isCompanyCpfValid, setIsCompanyCpfValid] = useState(true);
  const [isCompanyCnpjValid, setIsCompanyCnpjValid] = useState(true);
  const [isCompanyEmailContactValid, setIsCompanyEmailContactValid] = useState(
    true
  );
  const [isCompanyPhoneContactValid, setIsCompanyPhoneContactValid] = useState(
    true
  );

  const [counterAnswers, setCounterAnswers] = useState(0);

  const formRef = useRef<FormHandles>(null);

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName && companyNameOpen) {
      setCompanyNameOpen(!companyNameOpen); // Close question opened
      setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Open next question
      setCounterAnswers(counterAnswers + 1); // Set as answered
    }
  }, [companyName, companyNameOpen, companyCpfCnpjOpen, counterAnswers]);

  const handleSubmitCompanyCpfCnpj = useCallback(() => {
    if (companyCpfCnpj !== '' && companyCpfCnpjOpen) {
      if (isCNPJ(companyCpfCnpj)) {
        setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Close question opened
        setCompanyNameContactOpen(!companyNameContactOpen); // Open next question
        setIsCompanyCnpjValid(true);
        setIsCompanyCpfValid(true);
        setCounterAnswers(counterAnswers + 1); // Set as answered
      } else {
        setIsCompanyCnpjValid(false);
      }

      if (isCPF(companyCpfCnpj)) {
        setCompanyCpfCnpjOpen(!companyCpfCnpjOpen); // Close question opened
        setCompanyNameContactOpen(!companyNameContactOpen); // Open next question
        setIsCompanyCnpjValid(true);
        setIsCompanyCpfValid(true);
        setCounterAnswers(counterAnswers + 1); // Set as answered
      } else {
        setIsCompanyCpfValid(false);
      }
    }
  }, [
    companyCpfCnpj,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    counterAnswers,
  ]);

  const handleSubmitCompanyNameContact = useCallback(() => {
    if (companyNameContact && companyNameContactOpen) {
      setCompanyNameContactOpen(!companyNameContactOpen); // Close question opened
      setCompanyEmailContactOpen(!companyEmailContactOpen); // Open next question
      setCounterAnswers(counterAnswers + 1); // Set as answered
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
        setCounterAnswers(counterAnswers + 1); // Set as answered
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
        setCompanyNameOpen(!companyNameOpen); // Open next question
        setIsCompanyPhoneContactValid(true);
        setCounterAnswers(counterAnswers + 1); // Set as answered
      } else {
        setIsCompanyPhoneContactValid(false);
      }
    }
  }, [
    companyPhoneContact,
    companyPhoneContactOpen,
    companyNameOpen,
    counterAnswers,
  ]);

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
      setIsCompanyCpfValid(true);
      setIsCompanyCnpjValid(true);
    }
    if (companyEmailContact === '') {
      setIsCompanyEmailContactValid(true);
    }
    if (companyPhoneContact === '') {
      setIsCompanyPhoneContactValid(true);
    }
  }, [companyCpfCnpj, companyEmailContact, companyPhoneContact]);

  const forceFocusOnInputField = useCallback((id: string): void => {
    const getElement = document.getElementById(id);

    if (getElement !== null) {
      getElement.focus();
    }
  }, []);

  $('#companyPhoneContact-input').mask('(00) 0000-00009', {
    onKeyPress(value: string): void {
      const mask = value.length < 15 ? '(00) 0000-00009' : '(00) 00000-0000';
      $('#companyPhoneContact-input').mask(mask);
    },
  });

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
  }, [
    companyNameOpen,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    companyEmailContactOpen,
    companyPhoneContactOpen,
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
      setCompanyNameOpen(!companyNameOpen);
    }
  }, [
    companyNameOpen,
    companyCpfCnpjOpen,
    companyNameContactOpen,
    companyEmailContactOpen,
    companyPhoneContactOpen,
  ]);

  const eventKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      console.log('chegou aqui');
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

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <Container>
        <Form ref={formRef} onSubmit={() => {}}>
          <Content color={color}>
            {companyNameOpen && (
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
                  openOnFocus={companyName === null}
                  openText=""
                  id="input-highlights"
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
                      autoFocus
                      helperText=" "
                      {...params}
                      placeholder="Escreva ou selecione uma opção"
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
                  <SubmitQuestion>
                    <Button onClick={handleSubmitCompanyName}>Continuar</Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestion>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyName>
            )}
            {companyCpfCnpjOpen && (
              <WhatIsCompanyCpfCnpj companyCpfCnpjOpen={companyCpfCnpjOpen}>
                <AskTitle>
                  <div>
                    <span>2</span>
                    <FiArrowRight />
                  </div>
                  <div>
                    Qual o <strong>CNPJ</strong> ou <strong>CPF</strong> deste
                    cliente?
                  </div>
                </AskTitle>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      autoFocus
                      error={!isCompanyCpfValid || !isCompanyCnpjValid}
                      helperText={
                        !isCompanyCnpjValid || !isCompanyCpfValid
                          ? 'Dados inválidos'
                          : ' '
                      }
                      placeholder="Digite aqui"
                      value={companyCpfCnpj}
                      onChange={(e) => setCompanyCpfCnpj(e.target.value)}
                      name="formattedValue"
                      id="companyCpfCnpj-input"
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
                  <SubmitQuestion>
                    <Button onClick={handleSubmitCompanyCpfCnpj}>
                      Continuar
                    </Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestion>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyCpfCnpj>
            )}
            {companyNameContactOpen && (
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
                      autoFocus
                      helperText=" "
                      placeholder="Digite aqui"
                      value={companyNameContact}
                      onChange={(e) => setCompanyNameContact(e.target.value)}
                      id="companyNameContact-input"
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
                  <SubmitQuestion>
                    <Button onClick={handleSubmitCompanyNameContact}>
                      Continuar
                    </Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestion>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyNameContact>
            )}
            {companyEmailContactOpen && (
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
                      autoFocus
                      error={!isCompanyEmailContactValid}
                      helperText={
                        !isCompanyEmailContactValid ? 'E-mail inválido' : ' '
                      }
                      placeholder="Digite aqui"
                      value={companyEmailContact}
                      onChange={(e) => setCompanyEmailContact(e.target.value)}
                      id="companyEmailContact-input"
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
                  <SubmitQuestion>
                    <Button onClick={handleSubmitCompanyEmailContact}>
                      Continuar
                    </Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestion>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyEmailContact>
            )}
            {companyPhoneContactOpen && (
              <WhatIsCompanyPhoneContact
                companyPhoneContactOpen={companyPhoneContactOpen}
              >
                <AskTitle>
                  <div>
                    <span>5</span>
                    <FiArrowRight />
                  </div>
                  <div>
                    Qual o <strong>telefone</strong> do responsável?
                  </div>
                </AskTitle>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      autoFocus
                      placeholder="Digite aqui"
                      id="companyPhoneContact-input"
                      error={!isCompanyPhoneContactValid}
                      helperText={
                        !isCompanyPhoneContactValid ? 'Telefone inválido' : ' '
                      }
                      value={companyPhoneContact}
                      onChange={(e) => setCompanyPhoneContact(e.target.value)}
                      autoComplete="off"
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
                  <SubmitQuestion>
                    <Button onClick={handleSubmitCompanyPhoneContact}>
                      Continuar
                    </Button>
                    <div>
                      <span>
                        Pressione <strong>ENTER</strong>
                      </span>
                      <img src={EnterIcon} alt="" />
                    </div>
                  </SubmitQuestion>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyPhoneContact>
            )}
          </Content>
        </Form>
        <Footer>
          <Progress color={color} counterAnswers={counterAnswers}>
            <span>
              {counterAnswers} de 5 respondida{counterAnswers > 1 && 's'}
            </span>
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
      </Container>
    </ThemeProvider>
  );
};

export default NewOrder;
