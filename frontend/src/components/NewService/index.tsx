import React, {
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createFilterOptions, Autocomplete } from '@material-ui/lab';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { ThemeProvider } from '@material-ui/styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as themeAugmentation from '@material-ui/lab/themeAugmentation';
import {
  createMuiTheme,
  Grid,
  IconButton,
  TextField as OriginalTextField,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { Close } from '@material-ui/icons';
import { FaTimes } from 'react-icons/fa';
import { uuid } from 'uuidv4';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { TextField } from 'unform-material-ui';

import { ServiceData } from '../Order';
import Button from '../Button';
import DisabledButton from '../DisabledButton';
import { useToast } from '../../hooks/toast';

import {
  ModalContainer,
  Header,
  Content,
  Background,
  Service,
  Description,
  Value,
} from './styles';

interface NewServiceProps {
  color: string;
  setNewServiceOpen(e: boolean): void;
  setServices(e: ServiceData): void;
  setEditedServices(e: ServiceData): void;
  serviceToEdit: ServiceData;
  setServiceToEdit(e: ServiceData): void;
}

interface ServiceState {
  inputValue?: string;
  category?: string;
  name: string;
}

interface InputData {
  descriptionData: string;
}

interface ValueState {
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
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      fixedDecimalScale
      prefix="R$ "
      decimalScale={2}
    />
  );
}

const NewService: React.FC<NewServiceProps> = ({
  color,
  setNewServiceOpen,
  setServices,
  setEditedServices,
  serviceToEdit,
  setServiceToEdit,
}) => {
  const [service, setService] = useState<ServiceState>({} as ServiceState);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<ValueState>({
    formattedValue: '',
  });

  const descriptionRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const services: ServiceState[] = [
    {
      category: 'Segurança do Trabalho',
      name: 'PPRA - Programa de Prevenção dos Riscos Ambientais',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'LTCAT - Laudo Técnico das Condições Ambientais de Trabalho',
    },
    {
      category: 'Segurança do Trabalho',
      name:
        'PCMAT - Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção Civil',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'LTIP - Laudo Técnico de Insalubridade e Periculosidade',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'Laudo NR-12 - Segurança em Máquinas e Equipamentos',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'Ordem de Serviço',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'Mapa de Risco',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'PGR - Programa de Gerenciamento de Riscos',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'PGRSS - Plano de Gerenciamento de Resíduos de Serviços de Saúde',
    },
    {
      category: 'Segurança do Trabalho',
      name:
        'PGSSMATR - Programa de Gestão de Segurança e Saúde no Meio Ambiente do Trabalho Rural',
    },
    {
      category: 'Segurança do Trabalho',
      name: 'Assistência Técnica em Perícia Trabalhista ',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Integração e O.S. - NR-01',
    },
    {
      category: 'TREINAMENTOS',
      name: 'CIPA (Comissão Interna de Prevenção de acidentes) - NR-05',
    },
    {
      category: 'TREINAMENTOS',
      name:
        'Uso Adequado dos EPIs (Equipamento de Proteção Individual) - NR-06',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Primeiros Socorros - NR-07',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança em Instalações e Serviços em Eletricidade - NR-10',
    },
    {
      category: 'TREINAMENTOS',
      name:
        'Transporte, Movimentação, Armazenagem e Manuseio de Materiais - NR-11',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança no Trabalho em Máquinas e Equipamentos - NR-12',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Caldeiras, Vasos de Pressão e Tubulação - NR-13',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Atividades e Operações Insalubres - NR-15',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Atividades e Operações Perigosas - NR-16',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Ergonomia - NR-17',
    },
    {
      category: 'TREINAMENTOS',
      name:
        'Condições e Meio Ambiente de Trabalho na Indústria da Construção - NR-18',
    },
    {
      category: 'TREINAMENTOS',
      name:
        'Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis - NR-20',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança e Saúde Ocupacional na Mineração - NR-22',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Treinamento e Prevenção a Combate a Incêndio - NR-23',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Formação de Brigada de Incêndio - NR-23',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança no Trabalho com Agrotóxicos - NR-31',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança na Operação de Máquinas Agrícolas - NR-31',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança e Saúde no Trabalho em Serviços de Saúde - NR-32',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Trabalho em Espaços Confinados - NR-33',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Trabalho em Altura - NR-35',
    },
    {
      category: 'TREINAMENTOS',
      name: 'SIPAT - Semana Interna de Prevenção de Acidentes do Trabalho',
    },
    {
      category: 'TREINAMENTOS',
      name: 'Segurança e Meio Ambiente - Posto de Gasolina',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'PCMSO - Programa de Controle Médico de Saúde Ocupacional',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'ASO - Atestado de Saúde Ocupacional',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Exames Complementares',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'PCA - Programa de Conservação Auditiva',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'PPR - Programa de Proteção Respiratória',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'AET – Análise Ergonômica do Trabalho',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Relatório Anual do PCMSO',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Laudo PcD - Pessoas com Deficiência',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Homologação de Atestado',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Atendimento Assistencial',
    },
    {
      category: 'MEDICINA OCUPACIONAL',
      name: 'Perícia Médica Trabalhista ',
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
        groupLabel: {
          borderBottom: `1px solid ${color}`,
          color,
          textTransform: 'uppercase',
        },
      },
      MuiTextField: {
        root: {
          width: '100%',
          '&& textarea': {
            minHeight: '50px',
            padding: '0 4px',
          },
        },
      },
    },
  });

  const filter = createFilterOptions<ServiceState>();

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  // Verifica se tem serviço para ser alterado e seta os campos do modal com esses valores
  useEffect(() => {
    if (
      serviceToEdit.name &&
      serviceToEdit.description &&
      serviceToEdit.value
    ) {
      setService({
        name: serviceToEdit.name,
      });
      setDescription(serviceToEdit.description);
      setValue({
        formattedValue: String(serviceToEdit.value),
      });
    }
  }, [serviceToEdit]);

  // Fecha o modal e envia os dados para a Order
  const handleSubmit = useCallback(
    ({ descriptionData }: InputData) => {
      if (
        serviceToEdit.name &&
        serviceToEdit.description &&
        serviceToEdit.value
      ) {
        setNewServiceOpen(false);
        setEditedServices({
          id: serviceToEdit.id,
          name: service.name,
          description: descriptionData,
          value: Number(value.formattedValue),
        });
        setServiceToEdit({} as ServiceData);

        addToast({
          type: 'success',
          description: 'Serviço alterado com sucesso!',
        });
      } else {
        setDescription(descriptionData);
        setNewServiceOpen(false);
        setServices({
          id: uuid(),
          name: service.name,
          description: descriptionData,
          value: Number(value.formattedValue),
        });

        addToast({
          type: 'success',
          description: 'Serviço criado com sucesso!',
        });
      }
    },
    [
      addToast,
      service.name,
      serviceToEdit.description,
      serviceToEdit.id,
      serviceToEdit.name,
      serviceToEdit.value,
      setEditedServices,
      setNewServiceOpen,
      setServiceToEdit,
      setServices,
      value.formattedValue,
    ]
  );

  const handleCloseWindow = useCallback(() => {
    setNewServiceOpen(false);
    setService({
      name: '',
    });
    setDescription('');
    setValue({
      formattedValue: '',
    });
    setServiceToEdit({} as ServiceData);
  }, [setServiceToEdit, setNewServiceOpen]);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <ModalContainer>
        <Header color={color}>
          {serviceToEdit.name &&
          serviceToEdit.description &&
          serviceToEdit.value ? (
            <strong>ALTERAR SERVIÇO</strong>
          ) : (
            <strong>ADICIONAR SERVIÇO</strong>
          )}
          <button type="button" onClick={() => handleCloseWindow()}>
            <FaTimes />
          </button>
        </Header>
        <Content color={color}>
          <Form ref={descriptionRef} onSubmit={handleSubmit}>
            <Service>
              <Autocomplete
                openText=""
                clearText=""
                clearOnBlur={false}
                id="input-service"
                value={service}
                onChange={(event, newService) => {
                  if (newService && newService.inputValue) {
                    setService({
                      name: newService.inputValue,
                    });
                  } else if (newService) {
                    setService(newService);
                  }
                  if (!newService) {
                    setService({} as ServiceState);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params) as ServiceState[];

                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      name: `Adicionar ${params.inputValue}`,
                    });
                  }

                  return filtered;
                }}
                options={services}
                groupBy={({ category }) => category || ''}
                noOptionsText=""
                getOptionLabel={({ name, inputValue }) => {
                  if (inputValue) {
                    return inputValue;
                  }
                  return name;
                }}
                renderInput={(params) => (
                  <OriginalTextField autoFocus {...params} label="Serviço" />
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
            </Service>
            <Description>
              <TextField
                id="multiline-flexible"
                name="descriptionData"
                placeholder="Descrição do serviço"
                multiline
                defaultValue={description}
                rowsMax={5}
              />
            </Description>
            <Value>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <OriginalTextField
                    label="Valor"
                    value={value.formattedValue}
                    onChange={handleChangeValue}
                    name="formattedValue"
                    id="formatted-formattedValue-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                  />
                </Grid>
                <Grid item>
                  {value.formattedValue && (
                    <IconButton
                      onClick={() => {
                        setValue({
                          formattedValue: '',
                        });
                      }}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Value>
            {serviceToEdit.name && serviceToEdit.value && (
              <Button>Alterar</Button>
            )}
            {service.name &&
              value.formattedValue &&
              !serviceToEdit.name &&
              !serviceToEdit.value && <Button>Adicionar</Button>}
            {(service.name === undefined || !value.formattedValue) && (
              <DisabledButton>Adicionar</DisabledButton>
            )}
          </Form>
        </Content>
      </ModalContainer>
      <Background />
    </ThemeProvider>
  );
};

export default NewService;
