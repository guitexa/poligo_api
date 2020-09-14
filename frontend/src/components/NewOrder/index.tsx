import React, {
  useRef,
  useCallback,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
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
import { FiArrowRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import NumberFormat from 'react-number-format';
import { Close } from '@material-ui/icons';
import { isCNPJ } from 'brazilian-values';

import Button from '../Button';
import DisabledButton from '../DisabledButton';

import {
  Container,
  Content,
  AskTitle,
  WhatIsCompanyName,
  WhatIsCompanyCNPJ,
} from './styles';

interface NewOrderProps {
  color: string;
}

interface WhatIsCompanyNameState {
  inputValue?: string;
  name: string;
}

interface CompanyCNPJState {
  formattedValue: string;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps): JSX.Element {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(value) => {
        onChange({
          target: {
            name: props.name,
            value: value.value,
          },
        });
      }}
      isNumericString
      format="##.###.###/####-##"
      mask="_"
    />
  );
}

const NewOrder: React.FC<NewOrderProps> = ({ color }) => {
  const [companyName, setCompanyName] = useState<WhatIsCompanyNameState | null>(
    null
  );
  const [companyCNPJ, setCompanyCNPJ] = useState<CompanyCNPJState>({
    formattedValue: '',
  });
  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCNPJOpen, setCompanyCNPJOpen] = useState(false);
  const [isCompanyCNPJValid, setIsCompanyCNPJValid] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName && companyNameOpen) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCNPJOpen(!companyCNPJOpen);
    }
  }, [companyName, companyNameOpen, companyCNPJOpen]);

  const handleSubmitCompanyCNPJ = useCallback(() => {
    if (companyCNPJ.formattedValue !== '' && companyCNPJOpen) {
      if (isCNPJ(companyCNPJ.formattedValue)) {
        setCompanyCNPJOpen(!companyCNPJOpen);
        setCompanyNameOpen(!companyNameOpen);
        if (isCompanyCNPJValid === false) {
          setIsCompanyCNPJValid(true);
        }
      } else {
        setIsCompanyCNPJValid(false);
      }
    }
  }, [
    companyCNPJ.formattedValue,
    companyCNPJOpen,
    companyNameOpen,
    isCompanyCNPJValid,
  ]);

  const companyNames: WhatIsCompanyNameState[] = [
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

  const filter = createFilterOptions<WhatIsCompanyNameState>();

  const handleChangeCompanyCNPJ = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCompanyCNPJ({
      ...companyCNPJ,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (companyCNPJ.formattedValue === '') {
      setIsCompanyCNPJValid(true);
    }
  }, [companyCNPJ.formattedValue]);

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
                    Qual a <strong>razão social</strong> da empresa cliente?
                  </div>
                </AskTitle>
                <Autocomplete
                  openOnFocus
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
                    ) as WhatIsCompanyNameState[];

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
                      helperText=" "
                      autoFocus
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
                  <Button
                    className="submit-button"
                    onClick={handleSubmitCompanyName}
                  >
                    Continuar
                  </Button>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyName>
            )}
            {companyCNPJOpen && (
              <WhatIsCompanyCNPJ companyCNPJOpen={companyCNPJOpen}>
                <AskTitle>
                  <div>
                    <span>2</span>
                    <FiArrowRight />
                  </div>
                  <div>
                    Qual o <strong>CNPJ</strong> desta empresa?
                  </div>
                </AskTitle>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      autoFocus
                      error={!isCompanyCNPJValid}
                      helperText={!isCompanyCNPJValid ? 'CNPJ Inválido' : ' '}
                      placeholder="Digite aqui"
                      value={companyCNPJ.formattedValue}
                      onChange={handleChangeCompanyCNPJ}
                      name="formattedValue"
                      id="formatted-formattedValue-input"
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {companyCNPJ.formattedValue && (
                      <IconButton
                        onClick={() => {
                          setCompanyCNPJ({
                            formattedValue: '',
                          });
                        }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {companyCNPJ.formattedValue !== '' ? (
                  <Button
                    className="submit-button"
                    type="submit"
                    onClick={handleSubmitCompanyCNPJ}
                  >
                    Continuar
                  </Button>
                ) : (
                  <DisabledButton>Continuar</DisabledButton>
                )}
              </WhatIsCompanyCNPJ>
            )}
          </Content>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

export default NewOrder;
