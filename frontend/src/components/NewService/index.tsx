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
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { TextField } from 'unform-material-ui';

import { OrderDataType, ServiceOrderData } from '../SearchResults';
import Button from '../Button';
import DisabledButton from '../DisabledButton';

import api from '../../services/api';

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
  order_product_id?: string;
  order_id?: string;
  setNewServiceOpen(e: boolean): void;
  setOrderProductId(e: string): void;
  updateOrderProduct(data: ServiceOrderData): void;
  addNewOrderProduct(data: ServiceOrderData): void;
}

interface ServiceState {
  inputValue?: string;
  id?: string;
  name: string;
}

interface CreateProductResponse {
  id: string;
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
  order_product_id,
  order_id,
  setNewServiceOpen,
  setOrderProductId,
  updateOrderProduct,
  addNewOrderProduct,
}) => {
  const [services, setServices] = useState<ServiceState[]>([]);
  const [product, setProduct] = useState<ServiceOrderData>(
    {} as ServiceOrderData
  );
  const [service, setService] = useState<ServiceState>({} as ServiceState);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<ValueState>({
    formattedValue: '',
  });

  const descriptionRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  useEffect(() => {
    api
      .get<ServiceState[]>('/products')
      .then((response) => setServices(response.data));
  }, []);

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

  const handleCloseWindow = useCallback(() => {
    setNewServiceOpen(false);
    setService({
      name: '',
    });
    setDescription('');
    setValue({
      formattedValue: '',
    });
    setOrderProductId('');
  }, [setNewServiceOpen, setOrderProductId]);

  useEffect(() => {
    if (order_product_id) {
      api
        .get<ServiceOrderData>(`/orders-products/${order_product_id}`)
        .then((response) => {
          setProduct(response.data);

          setService({
            name: response.data.product.name,
          });
          setDescription(response.data.product_description);
          setValue({
            formattedValue: response.data.product_value,
          });
        });
    }
  }, [order_product_id]);

  const handleSubmit = useCallback(
    ({ descriptionData }: InputData) => {
      if (product && order_product_id) {
        if (service && description && value) {
          api
            .patch<ServiceOrderData>(`/orders-products/${order_product_id}`, {
              product_id: service.id,
              product_description: descriptionData,
              product_value: value.formattedValue,
            })
            .then((response) => {
              updateOrderProduct(response.data);
            });
        }

        handleCloseWindow();

        addToast({
          type: 'success',
          description: 'Serviço alterado com sucesso!',
        });
      } else {
        api
          .patch<OrderDataType>(`/orders/${order_id}`, {
            product_id: service.id,
            product_description: descriptionData,
            product_value: value.formattedValue,
          })
          .then((response) => {
            if (response.data.orders_products) {
              const createdOrder = response.data.orders_products.sort(
                (a, b) => {
                  if (a.created_at < b.created_at) return 1;
                  if (a.created_at > b.created_at) return -1;
                  return 0;
                }
              );

              addNewOrderProduct(createdOrder[0]);
            }
          });

        handleCloseWindow();

        addToast({
          type: 'success',
          description: 'Serviço criado com sucesso!',
        });
      }
    },
    [
      addNewOrderProduct,
      addToast,
      description,
      handleCloseWindow,
      order_id,
      order_product_id,
      product,
      service,
      updateOrderProduct,
      value,
    ]
  );

  const handleAddNewService = useCallback(
    (newServiceToAdd: string) => {
      api
        .post<CreateProductResponse>('/products', {
          name: newServiceToAdd,
        })
        .then((response) => {
          setService({
            id: response.data.id,
            name: newServiceToAdd,
          });

          setServices([
            ...services,
            {
              name: response.data.name,
              id: response.data.id,
            },
          ]);
        });

      addToast({
        type: 'success',
        description: 'Novo serviço adicionado na lista!',
      });
    },
    [addToast, services]
  );

  return (
    <>
      {order_product_id && service && value.formattedValue && (
        <ThemeProvider theme={defaultMaterialTheme}>
          <ModalContainer>
            <Header color={color}>
              <strong>ALTERAR SERVIÇO</strong>
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
                        handleAddNewService(newService.inputValue);
                      } else if (newService) {
                        setService(newService);
                      }
                      if (!newService) {
                        setService({} as ServiceState);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(
                        options,
                        params
                      ) as ServiceState[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={services}
                    noOptionsText=""
                    getOptionLabel={({ name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return name;
                    }}
                    renderInput={(params) => (
                      <OriginalTextField
                        autoFocus
                        {...params}
                        label="Serviço"
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
                <Button>Alterar</Button>
              </Form>
            </Content>
          </ModalContainer>
        </ThemeProvider>
      )}
      {order_id && !order_product_id && (
        <ThemeProvider theme={defaultMaterialTheme}>
          <ModalContainer>
            <Header color={color}>
              <strong>ADICIONAR SERVIÇO</strong>
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
                        handleAddNewService(newService.inputValue);
                      } else if (newService) {
                        setService(newService);
                      }
                      if (!newService) {
                        setService({} as ServiceState);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(
                        options,
                        params
                      ) as ServiceState[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={services}
                    noOptionsText=""
                    getOptionLabel={({ name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return name;
                    }}
                    renderInput={(params) => (
                      <OriginalTextField
                        autoFocus
                        {...params}
                        label="Serviço"
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
                {service.name && value.formattedValue ? (
                  <Button>Adicionar</Button>
                ) : (
                  <DisabledButton>Adicionar</DisabledButton>
                )}
              </Form>
            </Content>
          </ModalContainer>
        </ThemeProvider>
      )}
      <Background />
    </>
  );
};

export default NewService;
