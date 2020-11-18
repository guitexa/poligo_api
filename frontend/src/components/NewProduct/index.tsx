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

import { OrderDataType, OrderProductData } from '../SearchResults';
import Button from '../Button';
import DisabledButton from '../DisabledButton';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
  ModalContainer,
  Header,
  Content,
  Background,
  Product,
  Description,
  Value,
} from './styles';

interface NewProductProps {
  color: string;
  order_product_id?: string;
  order_id?: string;
  setNewProductOpen(e: boolean): void;
  setOrderProductId(e: string): void;
  updateOrderProduct(data: OrderProductData): void;
  addNewOrderProduct(data: OrderProductData): void;
}

interface ProductData {
  inputValue?: string;
  id?: string;
  name: string;
}

interface CreateProduct {
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

const NewProduct: React.FC<NewProductProps> = ({
  color,
  order_product_id,
  order_id,
  setNewProductOpen,
  setOrderProductId,
  updateOrderProduct,
  addNewOrderProduct,
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [product, setProduct] = useState<OrderProductData>(
    {} as OrderProductData
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductData>(
    {} as ProductData
  );
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<ValueState>({
    formattedValue: '',
  });

  const descriptionRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  useEffect(() => {
    api
      .get<ProductData[]>('/products')
      .then((response) => setProducts(response.data));
  }, []);

  const newProductMaterialTheme = createMuiTheme({
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

  const filter = createFilterOptions<ProductData>();

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseWindow = useCallback(() => {
    setNewProductOpen(false);
    setSelectedProduct({
      name: '',
    });
    setDescription('');
    setValue({
      formattedValue: '',
    });
    setOrderProductId('');
  }, [setNewProductOpen, setOrderProductId]);

  useEffect(() => {
    if (order_product_id) {
      api
        .get<OrderProductData>(`/orders-products/${order_product_id}`)
        .then((response) => {
          setProduct(response.data);

          setSelectedProduct({
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
        if (selectedProduct && description && value) {
          api
            .patch<OrderProductData>(`/orders-products/${order_product_id}`, {
              product_id: selectedProduct.id,
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
            product_id: selectedProduct.id,
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
      selectedProduct,
      updateOrderProduct,
      value,
    ]
  );

  const handleAddNewProduct = useCallback(
    (newProductToAdd: string) => {
      api
        .post<CreateProduct>('/products', {
          name: newProductToAdd,
        })
        .then((response) => {
          setSelectedProduct({
            id: response.data.id,
            name: newProductToAdd,
          });

          setProducts([
            ...products,
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
    [addToast, products]
  );

  return (
    <>
      {order_product_id && selectedProduct && value.formattedValue && (
        <ThemeProvider theme={newProductMaterialTheme}>
          <ModalContainer>
            <Header color={color}>
              <strong>ALTERAR SERVIÇO</strong>
              <button type="button" onClick={() => handleCloseWindow()}>
                <FaTimes />
              </button>
            </Header>
            <Content color={color}>
              <Form ref={descriptionRef} onSubmit={handleSubmit}>
                <Product>
                  <Autocomplete
                    openText=""
                    clearText=""
                    clearOnBlur={false}
                    id="input-selectedProduct"
                    value={selectedProduct}
                    onChange={(event, newProduct) => {
                      if (newProduct && newProduct.inputValue) {
                        handleAddNewProduct(newProduct.inputValue);
                      } else if (newProduct) {
                        setSelectedProduct(newProduct);
                      }
                      if (!newProduct) {
                        setSelectedProduct({} as ProductData);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params) as ProductData[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={products}
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
                        label="Serviço"
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
                </Product>
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
        <ThemeProvider theme={newProductMaterialTheme}>
          <ModalContainer>
            <Header color={color}>
              <strong>ADICIONAR SERVIÇO</strong>
              <button type="button" onClick={() => handleCloseWindow()}>
                <FaTimes />
              </button>
            </Header>
            <Content color={color}>
              <Form ref={descriptionRef} onSubmit={handleSubmit}>
                <Product>
                  <Autocomplete
                    openText=""
                    clearText=""
                    clearOnBlur={false}
                    value={selectedProduct}
                    onChange={(event, newProduct) => {
                      if (newProduct && newProduct.inputValue) {
                        handleAddNewProduct(newProduct.inputValue);
                      } else if (newProduct) {
                        setSelectedProduct(newProduct);
                      }
                      if (!newProduct) {
                        setSelectedProduct({} as ProductData);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params) as ProductData[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={products}
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
                </Product>
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
                {selectedProduct.name && value.formattedValue ? (
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

export default NewProduct;
