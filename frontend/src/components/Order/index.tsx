/* eslint-disable react/jsx-indent */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import {
  FaPlus,
  FaCheckCircle,
  FaRegClock,
  FaTimes,
  FaCalendarTimes,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import { RiDraftFill } from 'react-icons/ri';
import { IoMdThumbsDown } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { isValid, parseISO } from 'date-fns';
import {
  formatToCNPJ,
  formatToCPF,
  formatToPhone,
  formatToDate,
} from 'brazilian-values';

import formatValue from '../../utils/formatValue';
import formatValueCurrency from '../../utils/formatValueCurrency';
import convertDate from '../../utils/convertDate';

import { useToast } from '../../hooks/toast';
import { useOverlap } from '../../hooks/overlap';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import MaterialTooltip from '../MaterialTooltip';
import NewService from '../NewService';
import ProductView from '../ProductView';
import InputAsText from '../InputAsText';
import InputAsTextWithMask from '../InputAsTextWithMask';
import HeaderButton from '../HeaderButton';

import {
  OrderDataType,
  ServiceOrderData,
  UpdateSearchResultsData,
} from '../SearchResults';

import {
  OrderOverlap,
  ModalOverlap,
  Container,
  PrimaryContent,
  CompanyData,
  OrderData,
  Status,
  SecondaryContent,
  AddServiceButton,
  TitlesForm,
  DataForm,
  DeliveryData,
  BillingData,
  ServicesOrderContent,
  TitleRow,
  ServiceRow,
  TitleServiceName,
  TitleServiceDescription,
  TitleServiceValue,
  ServiceName,
  ServiceDescription,
  ServiceValue,
} from './styles';

interface InputData {
  deliveryConditionsData: string;
  requestedDeliveryDateData: string;
  deliveryDateData: string;
  paymentWayData: string;
  dueDateData: string;
}

interface OrderProps {
  color: string;
  order_id: string;
  from: string;
  updateSearchResults(data: UpdateSearchResultsData): void;
}

const Order: React.FC<OrderProps> = ({
  color,
  order_id,
  from,
  updateSearchResults,
}) => {
  const [orderData, setOrderData] = useState<OrderDataType>(
    {} as OrderDataType
  );

  const [orderProductId, setOrderProductId] = useState('');
  const [serviceToView, setServiceToView] = useState<ServiceOrderData>(
    {} as ServiceOrderData
  );

  const [updateOrderProduct, setUpdateOrderProduct] = useState<
    ServiceOrderData
  >({} as ServiceOrderData);

  const [addNewOrderProduct, setAddNewOrderProduct] = useState<
    ServiceOrderData
  >({} as ServiceOrderData);

  const deliveryConditionsRef = useRef<FormHandles>(null);
  const requestedDeliveryDateRef = useRef<FormHandles>(null);
  const deliveryDateRef = useRef<FormHandles>(null);
  const paymentWayRef = useRef<FormHandles>(null);
  const dueDateRef = useRef<FormHandles>(null);

  const {
    orderOpen,
    newServiceOpen,
    productViewOpen,
    overlapOrderOpen,
    overlapNewServiceOpen,
    overlapProductViewOpen,
  } = useOverlap();
  const { addToast } = useToast();
  const { user, checkToken } = useAuth();

  // This hook must be executed only once
  useEffect(() => {
    checkToken();
    api.get<OrderDataType>(`/orders/${order_id}`).then((response) => {
      const {
        client,
        seller,
        approved_at,
        order_number,
        status_order,
        created_at,
        requested_delivery_date,
        delivery_date,
        orders_products,
        total_value,
        ...rest
      } = response.data;

      if (client) {
        const formattedOderData: OrderDataType = {
          ...rest,
          approved_at: approved_at ? formatToDate(parseISO(approved_at)) : '',
          created_at: created_at ? formatToDate(parseISO(created_at)) : '',
          delivery_date: delivery_date
            ? formatToDate(parseISO(delivery_date))
            : '',
          order_number,
          status_order,
          requested_delivery_date: requested_delivery_date
            ? formatToDate(parseISO(requested_delivery_date))
            : '',
          client: {
            ...client,
            cpf_cnpj:
              client.cpf_cnpj.length > 11
                ? formatToCNPJ(client.cpf_cnpj)
                : formatToCPF(client.cpf_cnpj),
            phone: formatToPhone(client.phone),
            mobile: client.mobile ? formatToPhone(client.mobile) : '',
          },
          seller,
          total_value: formatValueCurrency(Number(total_value)),
          orders_products: orders_products?.sort((a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
            return 0;
          }),
        };

        setOrderData(formattedOderData);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_id]);

  if (updateOrderProduct.id && orderData.orders_products) {
    const getOrderIndex = orderData.orders_products.findIndex(
      (result) => result.id === updateOrderProduct.id
    );

    if (getOrderIndex >= 0 && orderData.orders_products[getOrderIndex]) {
      orderData.orders_products[getOrderIndex] = updateOrderProduct;

      updateSearchResults({
        order_id,
        product_id_update: updateOrderProduct,
      });
    }

    setUpdateOrderProduct({} as ServiceOrderData);
  }

  if (addNewOrderProduct.id && orderData.orders_products) {
    const getOrderIndex = orderData.orders_products.findIndex(
      (result) => result.id === addNewOrderProduct.id
    );

    if (getOrderIndex < 0 && orderData.orders_products) {
      orderData.orders_products = [
        ...orderData.orders_products,
        addNewOrderProduct,
      ].sort((a, b) => {
        if (a.created_at < b.created_at) return -1;
        if (a.created_at > b.created_at) return 1;
        return 0;
      });

      updateSearchResults({
        order_id,
        product_id_add: addNewOrderProduct,
      });
    }
    setAddNewOrderProduct({} as ServiceOrderData);
  }

  const updateOrderStatus = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      if (e.target.value === 'Aprovado') {
        orderData.approved_at = formatToDate(new Date(Date.now()));
        checkToken();
        api.patch(`/orders/${order_id}`, {
          status_order: e.target.value,
          approved_at: new Date(Date.now()),
        });
      } else {
        checkToken();
        api.patch(`/orders/${order_id}`, {
          status_order: e.target.value,
        });
      }

      orderData.status_order = e.target.value;

      updateSearchResults({
        order_id,
        status_order: e.target.value,
      });

      addToast({
        type: 'success',
        description: 'Status atualizado com sucesso!',
      });
    },
    [
      addToast,
      checkToken,
      orderData.approved_at,
      orderData.status_order,
      order_id,
      updateSearchResults,
    ]
  );

  const updateDeliveryStatus = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      if (!orderData.technical) {
        checkToken();
        api.patch(`/orders/${order_id}`, {
          status_delivery: e.target.value,
          technical_id: user.id,
        });

        orderData.status_delivery = e.target.value;

        updateSearchResults({
          order_id,
          status_delivery: e.target.value,
          technical: user.name,
        });
      } else if (e.target.value === '') {
        checkToken();
        api.patch(`/orders/${order_id}`, {
          status_delivery: e.target.value,
          technical_id: null,
        });

        orderData.status_delivery = '';
        orderData.technical = undefined;

        updateSearchResults({
          order_id,
          status_delivery: '',
          technical: '',
        });
      } else {
        checkToken();
        api.patch(`/orders/${order_id}`, {
          status_delivery: e.target.value,
        });

        orderData.status_delivery = e.target.value;

        updateSearchResults({
          order_id,
          status_delivery: e.target.value,
        });
      }
      addToast({
        type: 'success',
        description: 'Status atualizado com sucesso!',
      });
    },
    [
      addToast,
      checkToken,
      orderData.status_delivery,
      orderData.technical,
      order_id,
      updateSearchResults,
      user.id,
      user.name,
    ]
  );

  const updateBillingStatus = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      orderData.status_billing = e.target.value;

      updateSearchResults({
        order_id,
        status_billing: e.target.value,
      });

      checkToken();
      api.patch(`/orders/${order_id}`, {
        status_billing: e.target.value,
      });

      addToast({
        type: 'success',
        description: 'Status atualizado com sucesso!',
      });
    },
    [
      addToast,
      checkToken,
      orderData.status_billing,
      order_id,
      updateSearchResults,
    ]
  );

  const updatePaymentStatus = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      orderData.status_payment = e.target.value;

      updateSearchResults({
        order_id,
        status_payment: e.target.value,
      });

      checkToken();
      api.patch(`/orders/${order_id}`, {
        status_payment: e.target.value,
      });

      addToast({
        type: 'success',
        description: 'Status atualizado com sucesso!',
      });
    },
    [
      addToast,
      checkToken,
      orderData.status_payment,
      order_id,
      updateSearchResults,
    ]
  );

  const handleDeleteServiceItem = useCallback(
    (order_product_id: string) => {
      checkToken();
      api.delete(`/orders-products/${order_product_id}`);

      orderData.orders_products = orderData.orders_products?.filter(
        (orders_product) => orders_product.id !== order_product_id
      );

      updateSearchResults({
        order_id,
        order_product_id_delete: order_product_id,
      });

      addToast({
        type: 'success',
        description: 'Serviço excluído com sucesso!',
      });
    },
    [
      addToast,
      checkToken,
      orderData.orders_products,
      order_id,
      updateSearchResults,
    ]
  );

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
      },
      faCheck: {
        color: '#1b914f',
        margin: '0 4px 0 0',
      },
      faRegClock: {
        color: '#555',
        margin: '0 4px 0 0',
      },
      riDraftFill: {
        color: '#999',
        margin: '0 4px 0 0',
      },
      faTimes: {
        color: '#f00',
        fontSize: '15px',
        margin: '0 4px 0 -2px',
      },
      faCalendarTimes: {
        color: '#c00000',
        margin: '0 4px 0 0',
      },
      ioThumbsDown: {
        color: '#c00000',
        fontSize: '15px',
        margin: '0 4px 0 -2px',
      },
      hiRefresh: {
        color: '#000',
        margin: '0 4px 0 0',
      },
    })
  );

  const {
    formControl,
    faCheck,
    faRegClock,
    riDraftFill,
    faTimes,
    faCalendarTimes,
    ioThumbsDown,
    hiRefresh,
  } = useStyles();

  const orderMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    overrides: {
      MuiMenuItem: {
        root: {
          '&& svg': {
            margin: '0 10px -1px -2px',
            '&[class*="ioThumbsDown"]': {
              margin: '0 10px -1px -3px',
              fontSize: '17px',
            },
            '&[class*="faTimes"]': {
              margin: '0 10px -1px -4px',
              fontSize: '20px',
            },
            '&[class*="riDraftFill"]': {
              margin: '0 10px -1px -3px',
              fontSize: '17px',
            },
            '&[class*="hiRefresh"]': {
              margin: '0 10px -1px -4px',
              fontSize: '18px',
            },
          },
          '&:hover': {
            backgroundColor: color,
            color: '#fff',
            '&& svg': {
              margin: '0 10px -1px -2px',
              color: '#fff',
              '&[class*="ioThumbsDown"]': {
                margin: '0 10px -1px -3px',
                fontSize: '17px',
              },
              '&[class*="faTimes"]': {
                margin: '0 10px -1px -4px',
                fontSize: '20px',
              },
              '&[class*="riDraftFill"]': {
                margin: '0 10px -1px -3px',
                fontSize: '17px',
              },
              '&[class*="hiRefresh"]': {
                margin: '0 10px -1px -4px',
                fontSize: '18px',
              },
            },
          },
          '&$selected': {
            backgroundColor: color,
            color: '#fff',
            '&& svg': {
              margin: '0 10px -1px -2px',
              color: '#fff',
              '&[class*="ioThumbsDown"]': {
                margin: '0 10px -1px -3px',
                fontSize: '17px',
              },
              '&[class*="faTimes"]': {
                margin: '0 10px -1px -4px',
                fontSize: '20px',
              },
              '&[class*="riDraftFill"]': {
                margin: '0 10px -1px -3px',
                fontSize: '17px',
              },
              '&[class*="hiRefresh"]': {
                margin: '0 10px -1px -4px',
                fontSize: '18px',
              },
            },
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
              '&& svg': {
                margin: '0 10px -1px -2px',
                color: '#fff',
                '&[class*="ioThumbsDown"]': {
                  margin: '0 10px -1px -3px',
                  fontSize: '17px',
                },
                '&[class*="faTimes"]': {
                  margin: '0 10px -1px -4px',
                  fontSize: '20px',
                },
                '&[class*="riDraftFill"]': {
                  margin: '0 10px -1px -3px',
                  fontSize: '17px',
                },
                '&[class*="hiRefresh"]': {
                  margin: '0 10px -1px -4px',
                  fontSize: '18px',
                },
              },
            },
          },
        },
      },
    },
  });

  const submitDeliveryConditions = useCallback(
    ({ deliveryConditionsData }: InputData) => {
      if (orderData.delivery_conditions !== deliveryConditionsData) {
        orderData.delivery_conditions = deliveryConditionsData;

        checkToken();
        api.patch(`/orders/${order_id}`, {
          delivery_conditions: deliveryConditionsData,
        });

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, checkToken, orderData.delivery_conditions, order_id]
  );

  const onDeliveryConditionsSubmit = useCallback(() => {
    deliveryConditionsRef.current?.submitForm();
  }, []);

  const submitRequestedDeliveryDate = useCallback(
    ({ requestedDeliveryDateData }: InputData) => {
      const year = new Date(
        convertDate(requestedDeliveryDateData)
      ).getFullYear();
      const month = new Date(convertDate(requestedDeliveryDateData)).getMonth();
      const day =
        new Date(convertDate(requestedDeliveryDateData)).getDate() + 1;

      if (orderData.requested_delivery_date !== requestedDeliveryDateData) {
        if (isValid(new Date(year, month, day))) {
          requestedDeliveryDateRef.current?.setErrors({});
          orderData.requested_delivery_date = requestedDeliveryDateData;

          checkToken();
          api.patch(`/orders/${order_id}`, {
            requested_delivery_date: new Date(year, month, day),
          });

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        } else if (requestedDeliveryDateData) {
          requestedDeliveryDateRef.current?.setErrors({
            requestedDeliveryDateData: 'Data inválida',
          });
        } else {
          orderData.requested_delivery_date = '';
          requestedDeliveryDateRef.current?.setErrors({});

          checkToken();
          api.patch(`/orders/${order_id}`, {
            requested_delivery_date: null,
          });

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        }
      }
    },
    [addToast, checkToken, orderData.requested_delivery_date, order_id]
  );

  const onRequestedDeliveryDateSubmit = useCallback(() => {
    requestedDeliveryDateRef.current?.submitForm();
  }, [requestedDeliveryDateRef]);

  const submitDeliveryDate = useCallback(
    ({ deliveryDateData }: InputData) => {
      const year = new Date(convertDate(deliveryDateData)).getFullYear();
      const month = new Date(convertDate(deliveryDateData)).getMonth();
      const day = new Date(convertDate(deliveryDateData)).getDate() + 1;
      if (orderData.delivery_date !== deliveryDateData) {
        if (isValid(new Date(year, month, day))) {
          deliveryDateRef.current?.setErrors({});
          orderData.delivery_date = deliveryDateData;

          checkToken();
          api.patch(`/orders/${order_id}`, {
            delivery_date: new Date(year, month, day),
          });

          updateSearchResults({
            order_id,
            delivery_date: deliveryDateData,
          });

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        } else if (deliveryDateData) {
          deliveryDateRef.current?.setErrors({
            deliveryDateData: 'Data inválida',
          });
        } else {
          orderData.delivery_date = '';
          deliveryDateRef.current?.setErrors({});

          checkToken();
          api.patch(`/orders/${order_id}`, {
            delivery_date: null,
          });

          updateSearchResults({
            order_id,
            delivery_date: '',
          });

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        }
      }
    },
    [
      addToast,
      checkToken,
      orderData.delivery_date,
      order_id,
      updateSearchResults,
    ]
  );

  const onDeliveryDateSubmit = useCallback(() => {
    deliveryDateRef.current?.submitForm();
  }, []);

  const submitPaymentWay = useCallback(
    ({ paymentWayData }: InputData) => {
      if (orderData.payment_way !== paymentWayData) {
        orderData.payment_way = paymentWayData;

        checkToken();
        api.patch(`/orders/${order_id}`, {
          payment_way: paymentWayData,
        });

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, checkToken, orderData.payment_way, order_id]
  );

  const onPaymentWaySubmit = useCallback(() => {
    paymentWayRef.current?.submitForm();
  }, []);

  const submitDueDate = useCallback(
    ({ dueDateData }: InputData) => {
      if (orderData.due_date !== dueDateData) {
        orderData.due_date = dueDateData;

        checkToken();
        api.patch(`/orders/${order_id}`, {
          due_date: dueDateData,
        });

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, checkToken, orderData.due_date, order_id]
  );

  const onDueDateSubmit = useCallback(() => {
    dueDateRef.current?.submitForm();
  }, []);

  const totalValue = useMemo((): string => {
    if (order_id) {
      api.patch(`/orders/${order_id}`, {});
    }

    if (orderData.orders_products) {
      const servicesValues = orderData.orders_products
        .map((service) => Number(service.product_value))
        .reduce((accumulator, serviceValue) => {
          return accumulator + serviceValue;
        }, 0);

      return servicesValues ? formatValueCurrency(servicesValues) : '';
    }

    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderData,
    updateOrderProduct,
    addNewOrderProduct,
    handleDeleteServiceItem,
  ]);

  const handleSelectProduct = useCallback(
    (data: ServiceOrderData) => {
      if (from === 'Comercial') {
        setOrderProductId(data.id);
        overlapNewServiceOpen(!newServiceOpen);
      } else {
        setServiceToView(data);
        overlapProductViewOpen(!productViewOpen);
      }
    },
    [
      from,
      newServiceOpen,
      overlapNewServiceOpen,
      overlapProductViewOpen,
      productViewOpen,
    ]
  );

  const handleCloseOrder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (from === 'TechnicalArea') {
        if (
          (orderData &&
            !!orderData.delivery_date &&
            !!orderData.status_delivery) ||
          (orderData && !orderData.delivery_date && !orderData.status_delivery)
        ) {
          overlapOrderOpen(!e);
        } else if (
          orderData &&
          !orderData.delivery_date &&
          !!orderData.status_delivery
        ) {
          addToast({
            type: 'info',
            description: 'Favor preencher a data de entrega',
          });
        } else {
          overlapOrderOpen(!e);
        }
      } else {
        overlapOrderOpen(!e);
      }
    },
    [addToast, from, orderData, overlapOrderOpen]
  );

  return (
    <OrderOverlap>
      {newServiceOpen && (
        <ModalOverlap>
          <NewService
            color={color}
            order_product_id={orderProductId}
            order_id={order_id}
            setNewServiceOpen={(e) => overlapNewServiceOpen(e)}
            setOrderProductId={(e) => setOrderProductId(e)}
            updateOrderProduct={(e) => setUpdateOrderProduct(e)}
            addNewOrderProduct={(e) => setAddNewOrderProduct(e)}
          />
        </ModalOverlap>
      )}
      {productViewOpen && (
        <ModalOverlap>
          <ProductView
            color={color}
            setProductViewOpen={(e) => overlapProductViewOpen(e)}
            productToView={serviceToView}
            from={from}
          />
        </ModalOverlap>
      )}
      {orderData && orderData.client && orderData.seller && (
        <>
          <HeaderButton
            show={orderOpen && !newServiceOpen && !productViewOpen}
            handleClick={(e) => handleCloseOrder(e)}
            type="button"
            icon={FaTimes}
            color={color}
            className="headerButton"
          />
          <Container>
            <ThemeProvider theme={orderMaterialTheme}>
              <PrimaryContent isModalOpen={newServiceOpen || productViewOpen}>
                <CompanyData>
                  <TitlesForm>
                    <p>Razão social:</p>
                    {orderData.client.cpf_cnpj.length > 14 ? (
                      <p>CNPJ:</p>
                    ) : (
                      <p>CPF:</p>
                    )}
                    <p>Contato:</p>
                    <p>E-mail:</p>
                    <p>Telefone:</p>
                    <p>Celular:</p>
                  </TitlesForm>
                  <DataForm>
                    <p>{orderData.client.company_name}</p>
                    <p>{orderData.client.cpf_cnpj}</p>
                    <p>{orderData.client.contact_name}</p>
                    <p>{orderData.client.email}</p>
                    <p>{orderData.client.phone}</p>
                    <p>{orderData.client.mobile}</p>
                  </DataForm>
                </CompanyData>
                <OrderData>
                  <TitlesForm>
                    <p>Pedido Nº:</p>
                    <p>Vendedor:</p>
                    <p>Valor total:</p>
                    <p>Data:</p>
                    <p>Status:</p>
                    <p>Data de aprovação:</p>
                  </TitlesForm>
                  <DataForm>
                    <p>{orderData.order_number}</p>
                    <p>{orderData.seller.name}</p>
                    <p>{from !== 'TechnicalArea' && totalValue}</p>
                    <p>{orderData.created_at}</p>
                    {from !== 'Comercial' &&
                      orderData.status_order === 'Rascunho' && (
                        <div className="status">
                          <RiDraftFill
                            className={`faRegClock ${riDraftFill}`}
                          />
                          <span>Rascunho</span>
                        </div>
                      )}
                    {from !== 'Comercial' &&
                      orderData.status_order === 'Aguardando' && (
                        <div className="status">
                          <FaRegClock className={`faRegClock ${faRegClock}`} />
                          <span>Aguardando cliente</span>
                        </div>
                      )}
                    {from !== 'Comercial' &&
                      orderData.status_order === 'Reprovado' && (
                        <div className="status">
                          <IoMdThumbsDown
                            className={`ioThumbsDown ${ioThumbsDown}`}
                          />
                          <span>Reprovado</span>
                        </div>
                      )}
                    {from !== 'Comercial' &&
                      orderData.status_order === 'Aprovado' && (
                        <div className="status">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          <span>Aprovado</span>
                        </div>
                      )}
                    {from !== 'Comercial' &&
                      orderData.status_order === 'Cancelado' && (
                        <div className="status">
                          <FaTimes className={`faTimes ${faTimes}`} />
                          <span>Cancelado</span>
                        </div>
                      )}
                    {from === 'Comercial' && (
                      <Status>
                        <FormControl className={formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="data-select"
                            value={orderData.status_order}
                            defaultValue=""
                            displayEmpty
                            onChange={(e: ChangeEvent<{ value: unknown }>) => {
                              updateOrderStatus(e);
                            }}
                          >
                            <MenuItem
                              value="Rascunho"
                              disabled={user.permissions !== 'Admin'}
                            >
                              <RiDraftFill className={riDraftFill} />
                              Rascunho
                            </MenuItem>
                            <MenuItem
                              value="Aguardando"
                              disabled={
                                orderData.status_order !== 'Rascunho' &&
                                orderData.status_order !== 'Aguardando' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaRegClock className={faRegClock} />
                              Aguardando cliente
                            </MenuItem>
                            <MenuItem
                              value="Reprovado"
                              disabled={
                                orderData.status_order !== 'Rascunho' &&
                                orderData.status_order !== 'Aguardando' &&
                                orderData.status_order !== 'Reprovado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <IoMdThumbsDown className={ioThumbsDown} />
                              Reprovado
                            </MenuItem>
                            <MenuItem
                              value="Aprovado"
                              disabled={
                                orderData.status_order !== 'Rascunho' &&
                                orderData.status_order !== 'Aguardando' &&
                                orderData.status_order !== 'Reprovado' &&
                                orderData.status_order !== 'Aprovado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaCheckCircle className={faCheck} />
                              Aprovado
                            </MenuItem>
                            <MenuItem
                              value="Cancelado"
                              disabled={
                                orderData.status_order !== 'Rascunho' &&
                                orderData.status_order !== 'Aguardando' &&
                                orderData.status_order !== 'Reprovado' &&
                                orderData.status_order !== 'Aprovado' &&
                                orderData.status_order !== 'Cancelado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaTimes className={faTimes} />
                              Cancelado
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Status>
                    )}
                    <p>
                      {orderData.status_order === 'Aprovado' &&
                        orderData.approved_at}
                    </p>
                  </DataForm>
                </OrderData>
              </PrimaryContent>
              <SecondaryContent isModalOpen={newServiceOpen || productViewOpen}>
                {((from === 'Comercial' &&
                  !orderData.status_delivery &&
                  !orderData.status_billing &&
                  !orderData.status_payment) ||
                  (from === 'Comercial' && user.permissions === 'Admin')) && (
                  <AddServiceButton
                    type="button"
                    color={color}
                    onClick={() => overlapNewServiceOpen(!newServiceOpen)}
                  >
                    <MaterialTooltip
                      title="Adicionar Serviço"
                      arrow
                      placement="top"
                    >
                      <FaPlus />
                    </MaterialTooltip>
                  </AddServiceButton>
                )}
                <DeliveryData>
                  <TitlesForm>
                    <p>Condições de entrega:</p>
                    <p>Data de entrega solicitada:</p>
                    <p>
                      {orderData.status_delivery === 'Concluído'
                        ? 'Data da entrega:'
                        : 'Data de entrega prevista:'}
                    </p>
                    <p>Status área técnica:</p>
                  </TitlesForm>
                  <DataForm>
                    {from === 'Comercial' && !orderData.status_delivery && (
                      <>
                        <Form
                          ref={deliveryConditionsRef}
                          onSubmit={submitDeliveryConditions}
                        >
                          <InputAsText
                            name="deliveryConditionsData"
                            onBlur={onDeliveryConditionsSubmit}
                            defaultValue={orderData.delivery_conditions}
                          />
                        </Form>
                        <Form
                          ref={requestedDeliveryDateRef}
                          onSubmit={submitRequestedDeliveryDate}
                        >
                          {orderData && orderData.requested_delivery_date && (
                            <InputAsTextWithMask
                              name="requestedDeliveryDateData"
                              onBlur={onRequestedDeliveryDateSubmit}
                              defaultValue={orderData.requested_delivery_date}
                              mask="99/99/9999"
                              maskChar={null}
                              styled={{ width: '6em' }}
                            />
                          )}
                          {orderData && !orderData.requested_delivery_date && (
                            <InputAsTextWithMask
                              name="requestedDeliveryDateData"
                              onBlur={onRequestedDeliveryDateSubmit}
                              defaultValue={orderData.requested_delivery_date}
                              mask="99/99/9999"
                              maskChar={null}
                              styled={{ width: '6em' }}
                            />
                          )}
                        </Form>
                        <p>{orderData && orderData.delivery_date}</p>
                      </>
                    )}
                    {from !== 'TechnicalArea' && !!orderData.status_delivery && (
                      <>
                        <p>{orderData && orderData.delivery_conditions}</p>
                        <p>{orderData && orderData.requested_delivery_date}</p>
                        <p>{orderData && orderData.delivery_date}</p>
                      </>
                    )}
                    {from === 'TechnicalArea' && (
                      <>
                        <p>{orderData && orderData.delivery_conditions}</p>
                        <p>{orderData && orderData.requested_delivery_date}</p>
                        <Form
                          ref={deliveryDateRef}
                          onSubmit={submitDeliveryDate}
                        >
                          {orderData && orderData.delivery_date && (
                            <InputAsTextWithMask
                              name="deliveryDateData"
                              onBlur={onDeliveryDateSubmit}
                              defaultValue={orderData.delivery_date}
                              mask="99/99/9999"
                              maskChar={null}
                              styled={{ width: '6em' }}
                            />
                          )}
                          {orderData && !orderData.delivery_date && (
                            <InputAsTextWithMask
                              name="deliveryDateData"
                              onBlur={onDeliveryDateSubmit}
                              defaultValue={orderData.delivery_date}
                              mask="99/99/9999"
                              maskChar={null}
                              styled={{ width: '6em' }}
                            />
                          )}
                        </Form>
                      </>
                    )}
                    {from !== 'TechnicalArea' && !orderData.status_delivery && (
                      <p />
                    )}
                    {from !== 'TechnicalArea' &&
                      orderData.status_delivery === 'Agendado' && (
                        <div className="status">
                          <FaRegClock className={faRegClock} />
                          <span>Agendado com o cliente</span>
                        </div>
                      )}
                    {from !== 'TechnicalArea' &&
                      orderData.status_delivery === 'Execução' && (
                        <div className="status">
                          <HiOutlineRefresh
                            className={`hiRefresh ${hiRefresh}`}
                          />
                          <span>Em execução</span>
                        </div>
                      )}
                    {from !== 'TechnicalArea' &&
                      orderData.status_delivery === 'Concluído' && (
                        <div className="status">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          <span>Concluído</span>
                        </div>
                      )}
                    {from !== 'TechnicalArea' &&
                      orderData.status_delivery === 'Cancelado' && (
                        <div className="status">
                          <FaTimes className={`faTimes ${faTimes}`} />
                          <span>Cancelado</span>
                        </div>
                      )}
                    {from === 'TechnicalArea' && (
                      <Status>
                        <FormControl className={formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="data-select"
                            value={orderData.status_delivery}
                            defaultValue=""
                            displayEmpty
                            onChange={(e: ChangeEvent<{ value: unknown }>) => {
                              updateDeliveryStatus(e);
                            }}
                          >
                            {(!orderData.status_delivery ||
                              user.permissions === 'Admin') && (
                              <MenuItem value="">
                                -- Selecione um status --
                              </MenuItem>
                            )}
                            <MenuItem
                              value="Agendado"
                              disabled={
                                !!orderData.status_delivery &&
                                orderData.status_delivery !== 'Agendado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaRegClock className={faRegClock} />
                              Agendado com o cliente
                            </MenuItem>
                            <MenuItem
                              value="Execução"
                              disabled={
                                !!orderData.status_delivery &&
                                orderData.status_delivery !== 'Agendado' &&
                                orderData.status_delivery !== 'Execução' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <HiOutlineRefresh
                                className={`hiRefresh ${hiRefresh}`}
                              />
                              Em execução
                            </MenuItem>
                            <MenuItem
                              value="Concluído"
                              disabled={
                                !!orderData.status_delivery &&
                                orderData.status_delivery !== 'Agendado' &&
                                orderData.status_delivery !== 'Execução' &&
                                orderData.status_delivery !== 'Concluído' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaCheckCircle className={`faCheck ${faCheck}`} />
                              Concluído
                            </MenuItem>
                            <MenuItem
                              value="Cancelado"
                              disabled={
                                !!orderData.status_delivery &&
                                orderData.status_delivery !== 'Agendado' &&
                                orderData.status_delivery !== 'Execução' &&
                                orderData.status_delivery !== 'Concluído' &&
                                orderData.status_delivery !== 'Cancelado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaTimes className={faTimes} />
                              Cancelado
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Status>
                    )}
                  </DataForm>
                </DeliveryData>
                <BillingData>
                  <TitlesForm>
                    <p>Forma de pagamento:</p>
                    <p>Vencimento:</p>
                    <p>Status faturamento:</p>
                    <p>Status financeiro:</p>
                  </TitlesForm>
                  <DataForm>
                    {from === 'Comercial' && !orderData.status_billing && (
                      <>
                        <Form ref={paymentWayRef} onSubmit={submitPaymentWay}>
                          <InputAsText
                            name="paymentWayData"
                            onBlur={onPaymentWaySubmit}
                            defaultValue={orderData.payment_way}
                          />
                        </Form>
                        <Form ref={dueDateRef} onSubmit={submitDueDate}>
                          <InputAsText
                            name="dueDateData"
                            onBlur={onDueDateSubmit}
                            defaultValue={orderData.due_date}
                          />
                        </Form>
                      </>
                    )}
                    {(from === 'Billing' ||
                      (from !== 'TechnicalArea' &&
                        !!orderData.status_billing)) && (
                      <>
                        <p>{orderData && orderData.payment_way}</p>
                        <p>{orderData && orderData.due_date}</p>
                      </>
                    )}
                    {from === 'TechnicalArea' && (
                      <>
                        <p />
                        <p />
                      </>
                    )}
                    {from !== 'Billing' && !orderData.status_billing && <p />}
                    {from !== 'Billing' &&
                      orderData.status_billing === 'Aguardando' && (
                        <div className="status">
                          <FaRegClock className={faRegClock} />
                          <span>Aguardando para Faturar</span>
                        </div>
                      )}
                    {from !== 'Billing' &&
                      orderData.status_billing === 'Faturado' && (
                        <div className="status">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          <span>Faturado</span>
                        </div>
                      )}
                    {from !== 'Billing' &&
                      orderData.status_billing === 'Cancelado' && (
                        <div className="status">
                          <FaTimes className={`faTimes ${faTimes}`} />
                          <span>Cancelado</span>
                        </div>
                      )}
                    {from === 'Billing' && (
                      <Status>
                        <FormControl className={formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="data-select"
                            value={orderData.status_billing}
                            defaultValue=""
                            displayEmpty
                            onChange={(e: ChangeEvent<{ value: unknown }>) => {
                              updateBillingStatus(e);
                            }}
                          >
                            {(!orderData.status_billing ||
                              user.permissions === 'Admin') && (
                              <MenuItem value="">
                                -- Selecione um status --
                              </MenuItem>
                            )}
                            <MenuItem
                              value="Aguardando"
                              disabled={
                                !!orderData.status_billing &&
                                orderData.status_billing !== 'Aguardando' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaRegClock className={faRegClock} />
                              Aguardando para Faturar
                            </MenuItem>
                            <MenuItem
                              value="Faturado"
                              disabled={
                                !!orderData.status_billing &&
                                orderData.status_billing !== 'Aguardando' &&
                                orderData.status_billing !== 'Faturado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaCheckCircle className={`faCheck ${faCheck}`} />
                              Faturado
                            </MenuItem>
                            <MenuItem
                              value="Cancelado"
                              disabled={
                                !!orderData.status_billing &&
                                orderData.status_billing !== 'Aguardando' &&
                                orderData.status_billing !== 'Faturado' &&
                                orderData.status_billing !== 'Cancelado' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaTimes className={faTimes} />
                              Cancelado
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Status>
                    )}
                    {from !== 'Billing' && !orderData.status_payment && <p />}
                    {from !== 'Billing' &&
                      orderData.status_payment === 'Aguardando' && (
                        <div className="status">
                          <FaRegClock className={faRegClock} />
                          <span>Aguardando Pagamento</span>
                        </div>
                      )}
                    {from !== 'Billing' && orderData.status_payment === 'Pago' && (
                      <div className="status">
                        <FaCheckCircle className={`faCheck ${faCheck}`} />
                        <span>Pago</span>
                      </div>
                    )}
                    {from !== 'Billing' &&
                      orderData.status_payment === 'Vencido' && (
                        <div className="status">
                          <FaCalendarTimes
                            className={`faCalendarTimes ${faCalendarTimes}`}
                          />
                          <span>Vencido</span>
                        </div>
                      )}
                    {from !== 'Billing' &&
                      orderData.status_payment === 'Cancelado' && (
                        <div className="status">
                          <FaTimes className={`faTimes ${faTimes}`} />
                          <span>Cancelado</span>
                        </div>
                      )}
                    {from === 'Billing' && (
                      <Status>
                        <FormControl className={formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="data-select"
                            value={orderData.status_payment}
                            defaultValue=""
                            displayEmpty
                            onChange={(e: ChangeEvent<{ value: unknown }>) => {
                              updatePaymentStatus(e);
                            }}
                          >
                            {(!orderData.status_payment ||
                              user.permissions === 'Admin') && (
                              <MenuItem value="">
                                -- Selecione um status --
                              </MenuItem>
                            )}
                            <MenuItem
                              value="Aguardando"
                              disabled={
                                !!orderData.status_payment &&
                                orderData.status_payment !== 'Aguardando' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaRegClock className={faRegClock} />
                              Aguardando Pagamento
                            </MenuItem>
                            <MenuItem
                              value="Pago"
                              disabled={
                                !!orderData.status_payment &&
                                orderData.status_payment !== 'Aguardando' &&
                                orderData.status_payment !== 'Pago' &&
                                orderData.status_payment !== 'Vencido' &&
                                user.permissions !== 'Admin'
                              }
                            >
                              <FaCheckCircle className={`faCheck ${faCheck}`} />
                              Pago
                            </MenuItem>
                            {orderData.status_payment !== 'Pago' && (
                              <MenuItem
                                value="Vencido"
                                disabled={
                                  !!orderData.status_payment &&
                                  orderData.status_payment !== 'Aguardando' &&
                                  orderData.status_payment !== 'Vencido' &&
                                  user.permissions !== 'Admin'
                                }
                              >
                                <FaCalendarTimes
                                  className={`faCalendarTimes ${faCalendarTimes}`}
                                />
                                Vencido
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Status>
                    )}
                  </DataForm>
                </BillingData>
              </SecondaryContent>
              <ServicesOrderContent
                isModalOpen={newServiceOpen || productViewOpen}
              >
                <TitleRow>
                  <TitleServiceName>SERVIÇO</TitleServiceName>
                  <TitleServiceDescription>
                    DESCRIÇÃO DO SERVIÇO
                  </TitleServiceDescription>
                  {from !== 'TechnicalArea' && (
                    <TitleServiceValue>VALOR</TitleServiceValue>
                  )}
                </TitleRow>
                {orderData.orders_products &&
                  orderData.orders_products.length > 0 &&
                  orderData.orders_products.map((service) => (
                    <ServiceRow color={color} key={service.id}>
                      <ServiceName
                        type="button"
                        onClick={() => handleSelectProduct(service)}
                      >
                        <span>{service.product.name}</span>
                      </ServiceName>
                      <ServiceDescription
                        type="button"
                        onClick={() => handleSelectProduct(service)}
                      >
                        <span>{service.product_description}</span>
                      </ServiceDescription>
                      {from !== 'TechnicalArea' && (
                        <ServiceValue>
                          <button
                            className="service-value"
                            type="button"
                            onClick={() => handleSelectProduct(service)}
                          >
                            <span>R$</span>
                            <span>
                              {formatValue(Number(service.product_value))}
                            </span>
                          </button>
                          {((from === 'Comercial' &&
                            !orderData.status_delivery &&
                            !orderData.status_billing &&
                            !orderData.status_payment) ||
                            (from === 'Comercial' &&
                              user.permissions === 'Admin')) && (
                            <div>
                              <button
                                className="edit-service"
                                type="button"
                                onClick={() => handleSelectProduct(service)}
                              >
                                <MaterialTooltip
                                  title="Alterar"
                                  arrow
                                  placement="left"
                                >
                                  <FaEdit className="faEdit" />
                                </MaterialTooltip>
                              </button>
                              <button
                                className="delete-service"
                                type="button"
                                onClick={() => {
                                  handleDeleteServiceItem(service.id);
                                }}
                              >
                                <MaterialTooltip
                                  title="Excluir"
                                  arrow
                                  placement="left"
                                >
                                  <FaTrashAlt className="faTrashAlt" />
                                </MaterialTooltip>
                              </button>
                            </div>
                          )}
                        </ServiceValue>
                      )}
                    </ServiceRow>
                  ))}
              </ServicesOrderContent>
            </ThemeProvider>
          </Container>
        </>
      )}
    </OrderOverlap>
  );
};

export default Order;
