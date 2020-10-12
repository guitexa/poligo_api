import React, {
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
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { isValid } from 'date-fns';

import { SearchResult } from '../SearchResults';
import formatValue from '../../utils/formatValue';
import formatValueCurrency from '../../utils/formatValueCurrency';
import convertDate from '../../utils/convertDate';

import { useToast } from '../../hooks/toast';
import { useOverlap } from '../../hooks/overlap';

import MaterialTooltip from '../MaterialTooltip';
import NewService from '../NewService';
import InputAsText from '../InputAsText';
import InputAsTextWithMask from '../InputAsTextWithMask';
import HeaderButton from '../HeaderButton';

import {
  OrderOverlap,
  NewServiceOverlap,
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
  ServiceName,
  ServiceDescription,
  ServiceValue,
} from './styles';

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface StatusState {
  order?: ' ' | 'Aguardando' | 'Aprovado' | 'Cancelado' | unknown | undefined;
  delivery?:
    | ' '
    | 'Agendado'
    | 'Andamento'
    | 'Concluído'
    | 'Cancelado'
    | unknown
    | undefined;
  billing?: ' ' | 'Aguardando' | 'Faturado' | 'Cancelado' | unknown | undefined;
  payment?: ' ' | 'Aguardando' | 'Pago' | 'Cancelado' | unknown | undefined;
}

interface InputData {
  deliveryConditionsData: string;
  requestedDeliveryDateData: string;
  deliveryDateData: string;
  paymentWayData: string;
  dueDateData: string;
}

interface OrderProps {
  color: string;
  data: SearchResult;
  from: string;
}

const Order: React.FC<OrderProps> = ({ color, data, from }) => {
  const [status, setStatus] = useState<StatusState>({
    order: data.status || ' ',
    delivery: 'Andamento',
    billing: 'Faturado',
    payment: 'Pago',
  });

  const [approvedDate, setApprovedDate] = useState('10/10/2020');

  const [deliveryConditions, setDeliveryConditions] = useState('');
  const [requestedDeliveryDate, setRequestedDeliveryDate] = useState(
    '10/10/2020'
  );
  const [deliveryDate, setDeliveryDate] = useState('10/10/2020');

  const [paymentWay, setPaymentWay] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [services, setServices] = useState<ServiceData[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceData>(
    {} as ServiceData
  );

  const deliveryConditionsRef = useRef<FormHandles>(null);
  const requestedDeliveryDateRef = useRef<FormHandles>(null);
  const deliveryDateRef = useRef<FormHandles>(null);
  const paymentWayRef = useRef<FormHandles>(null);
  const dueDateRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const {
    orderOpen,
    newServiceOpen,
    overlapOrderOpen,
    overlapNewServiceOpen,
  } = useOverlap();

  useEffect(() => {
    if (data.service && data.value && data.id) {
      const sample = {
        id: data.id,
        name: data.service,
        description:
          'descrição-qualquer-que-depois-vai-buscar-no-banco-de-dados',
        value: data.value,
      };

      setServices((state) => [...state, sample]);

      setApprovedDate('10/09/2020');

      setDeliveryConditions('Aguardar pagamento da segunda parcela');
      setRequestedDeliveryDate('10/10/2020'); // Não está definido esse valor aqui
      setPaymentWay('1+3x R$1.325,00');
      setDueDate('Entrada para 16/06 e parcelas junto com faturamento');
    }
  }, [data]);

  const handleDeleteServiceItem = useCallback((serviceID: string) => {
    setServices((state) => state.filter((service) => service.id !== serviceID));
  }, []);

  const handleEditServiceItem = useCallback(
    (dataToEdit: ServiceData) => {
      setServiceToEdit(dataToEdit);
      overlapNewServiceOpen(!newServiceOpen);
    },
    [newServiceOpen, overlapNewServiceOpen]
  );

  const handleEditedService = useCallback((e: ServiceData) => {
    setServices((state) => state.filter((service) => service.id !== e.id));
    setServices((state) => [...state, e]);
  }, []);

  const defaultMaterialTheme = createMuiTheme({
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
          },
          '&:last-child': {
            '&& svg': {
              margin: '0 10px -1px -3px',
              fontSize: '20px',
            },
          },
          '&:hover': {
            backgroundColor: color,
            color: '#fff',
            '&& svg': {
              margin: '0 10px -1px -2px',
              color: '#fff',
            },
            '&:last-child': {
              '&& svg': {
                margin: '0 10px -1px -3px',
                fontSize: '20px',
              },
            },
          },
          '&$selected': {
            backgroundColor: color,
            color: '#fff',
            '&& svg': {
              margin: '0 10px -1px -2px',
              color: '#fff',
            },
            '&:last-child': {
              '&& svg': {
                margin: '0 10px -1px -3px',
                fontSize: '20px',
              },
            },
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
              '&& svg': {
                margin: '0 10px -1px -2px',
                color: '#fff',
              },
              '&:last-child': {
                '&& svg': {
                  margin: '0 10px -1px -3px',
                  fontSize: '20px',
                },
              },
            },
          },
        },
      },
    },
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
      },
      faCheck: {
        color: '#1b914f',
        margin: '0 4px 1px 0',
      },
      faRegClock: {
        color: '#999',
        margin: '0 4px 1px 0',
      },
      faTimes: {
        color: '#f00',
        fontSize: '15px',
        margin: '0 4px 1px 0',
      },
      hiRefresh: {
        color: '#000',
        margin: '0 4px 1px 0',
      },
    })
  );

  const { formControl, faCheck, faRegClock, faTimes, hiRefresh } = useStyles();

  const submitDeliveryConditions = useCallback(
    ({ deliveryConditionsData }: InputData) => {
      if (deliveryConditions !== deliveryConditionsData) {
        setDeliveryConditions(deliveryConditionsData);

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, deliveryConditions]
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
      if (requestedDeliveryDate !== requestedDeliveryDateData) {
        if (isValid(new Date(year, month, day))) {
          requestedDeliveryDateRef.current?.setErrors({});
          setRequestedDeliveryDate(requestedDeliveryDateData);

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        } else {
          setRequestedDeliveryDate(requestedDeliveryDateData);
          requestedDeliveryDateRef.current?.setErrors({
            requestedDeliveryDateData: 'Data inválida',
          });
        }
      } else if (!requestedDeliveryDateData) {
        setRequestedDeliveryDate('');
        requestedDeliveryDateRef.current?.setErrors({});
      }
    },
    [addToast, requestedDeliveryDate]
  );

  const onRequestedDeliveryDateSubmit = useCallback(() => {
    requestedDeliveryDateRef.current?.submitForm();
  }, [requestedDeliveryDateRef]);

  const submitDeliveryDate = useCallback(
    ({ deliveryDateData }: InputData) => {
      const year = new Date(convertDate(deliveryDateData)).getFullYear();
      const month = new Date(convertDate(deliveryDateData)).getMonth();
      const day = new Date(convertDate(deliveryDateData)).getDate() + 1;
      if (deliveryDate !== deliveryDateData) {
        if (isValid(new Date(year, month, day))) {
          deliveryDateRef.current?.setErrors({});
          setDeliveryDate(deliveryDateData);

          addToast({
            type: 'success',
            description: 'Pedido atualizado com sucesso!',
          });
        } else {
          setDeliveryDate(deliveryDateData);
          deliveryDateRef.current?.setErrors({
            deliveryDateData: 'Data inválida',
          });
        }
      } else if (!deliveryDateData) {
        setDeliveryDate('');
        deliveryDateRef.current?.setErrors({});
      }
    },
    [addToast, deliveryDate]
  );

  const onDeliveryDateSubmit = useCallback(() => {
    deliveryDateRef.current?.submitForm();
  }, []);

  const submitPaymentWay = useCallback(
    ({ paymentWayData }: InputData) => {
      if (paymentWay !== paymentWayData) {
        setPaymentWay(paymentWayData);

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, paymentWay]
  );

  const onPaymentWaySubmit = useCallback(() => {
    paymentWayRef.current?.submitForm();
  }, []);

  const submitDueDate = useCallback(
    ({ dueDateData }: InputData) => {
      if (dueDate !== dueDateData) {
        setDueDate(dueDateData);

        addToast({
          type: 'success',
          description: 'Pedido atualizado com sucesso!',
        });
      }
    },
    [addToast, dueDate]
  );

  const onDueDateSubmit = useCallback(() => {
    dueDateRef.current?.submitForm();
  }, []);

  const totalValue = useMemo(() => {
    if (services.length > 0 && (from === 'Comercial' || from === 'Billing')) {
      const total = services
        .map((service) => service.value)
        .reduce((accumulator, serviceValue) => {
          return accumulator + serviceValue;
        }, 0);

      return formatValueCurrency(total);
    }
    return '--';
  }, [from, services]);

  return (
    <OrderOverlap>
      {newServiceOpen && (
        <NewServiceOverlap>
          <NewService
            color={color}
            setNewServiceOpen={(e) => overlapNewServiceOpen(e)}
            setServices={(e) => setServices((state) => [...state, e])}
            setEditedServices={(e) => handleEditedService(e)}
            serviceToEdit={serviceToEdit}
            setServiceToEdit={(e) => setServiceToEdit(e)}
          />
        </NewServiceOverlap>
      )}
      <HeaderButton
        show={orderOpen && !newServiceOpen}
        handleClick={(e) => overlapOrderOpen(!e)}
        type="button"
        icon={FaTimes}
        color={color}
      />
      <Container>
        <ThemeProvider theme={defaultMaterialTheme}>
          <PrimaryContent>
            <CompanyData>
              <TitlesForm>
                <p>Razão social:</p>
                {data.companyCpfCnpj && data.companyCpfCnpj?.length > 14 ? (
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
                <p>{data.companyName}</p>
                <p>{data.companyCpfCnpj}</p>
                <p>{data.companyNameContact}</p>
                <p>{data.companyEmailContact}</p>
                <p>{data.companyPhone || '--'}</p>
                <p>{data.companyMobilePhoneContact || '--'}</p>
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
                <p>{data.id}</p>
                <p>{data.seller}</p>
                <p>{totalValue}</p>
                <p>{data.formattedDate}</p>
                {from !== 'Comercial' && status.order === ' ' && <p>--</p>}
                {from !== 'Comercial' && status.order === 'Aprovado' && (
                  <div className="status">
                    <FaCheckCircle className={`faCheck ${faCheck}`} />
                    <span>Aprovado</span>
                  </div>
                )}
                {from !== 'Comercial' && status.order === 'Aguardando' && (
                  <div className="status">
                    <FaRegClock className={`faRegClock ${faRegClock}`} />
                    <span>Aguardando cliente</span>
                  </div>
                )}
                {from !== 'Comercial' && status.order === 'Cancelado' && (
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
                        value={status.order}
                        defaultValue=" "
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            order: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value=" ">--</MenuItem>
                        <MenuItem value="Aprovado">
                          <FaCheckCircle className={faCheck} />
                          Aprovado
                        </MenuItem>
                        <MenuItem value="Aguardando">
                          <FaRegClock className={faRegClock} />
                          Aguardando cliente
                        </MenuItem>
                        <MenuItem value="Cancelado">
                          <FaTimes className={faTimes} />
                          Cancelado
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Status>
                )}
                <p>{approvedDate}</p>
              </DataForm>
            </OrderData>
          </PrimaryContent>
          <SecondaryContent>
            {from === 'Comercial' && (
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
                  Data de entrega
                  {status.delivery !== 'Concluído' && ' prevista'}:
                </p>
                <p>Status área técnica:</p>
              </TitlesForm>
              <DataForm>
                {from === 'Comercial' && (
                  <>
                    <Form
                      ref={deliveryConditionsRef}
                      onSubmit={submitDeliveryConditions}
                    >
                      <InputAsText
                        name="deliveryConditionsData"
                        onBlur={onDeliveryConditionsSubmit}
                        defaultValue={deliveryConditions}
                      />
                    </Form>
                    <Form
                      ref={requestedDeliveryDateRef}
                      onSubmit={submitRequestedDeliveryDate}
                    >
                      <InputAsTextWithMask
                        name="requestedDeliveryDateData"
                        onBlur={onRequestedDeliveryDateSubmit}
                        defaultValue={requestedDeliveryDate}
                        mask="99/99/9999"
                        maskChar={null}
                        styled={{ width: '6em' }}
                      />
                    </Form>
                    <p>{deliveryDate}</p>
                  </>
                )}
                {from === 'Billing' && (
                  <>
                    <p>{deliveryConditions}</p>
                    <p>{requestedDeliveryDate}</p>
                    <p>{deliveryDate}</p>
                  </>
                )}
                {from === 'TechnicalArea' && (
                  <>
                    <p>{deliveryConditions}</p>
                    <p>{requestedDeliveryDate}</p>
                    {status.delivery !== 'Concluído' ? (
                      <Form ref={deliveryDateRef} onSubmit={submitDeliveryDate}>
                        <InputAsTextWithMask
                          name="deliveryDateData"
                          onBlur={onDeliveryDateSubmit}
                          defaultValue={deliveryDate}
                          mask="99/99/9999"
                          maskChar={null}
                          styled={{ width: '6em' }}
                        />
                      </Form>
                    ) : (
                      <p>{deliveryDate}</p>
                    )}
                  </>
                )}
                {from !== 'TechnicalArea' && status.delivery === ' ' && (
                  <p>--</p>
                )}
                {from !== 'TechnicalArea' && status.delivery === 'Agendado' && (
                  <div className="status">
                    <FaRegClock className={faRegClock} />
                    <span>Agendado com o cliente</span>
                  </div>
                )}
                {from !== 'TechnicalArea' && status.delivery === 'Andamento' && (
                  <div className="status">
                    <HiOutlineRefresh className={`hiRefresh ${hiRefresh}`} />
                    <span>Em andamento</span>
                  </div>
                )}
                {from !== 'TechnicalArea' && status.delivery === 'Concluído' && (
                  <div className="status">
                    <FaCheckCircle className={`faCheck ${faCheck}`} />
                    <span>Concluído</span>
                  </div>
                )}
                {from !== 'TechnicalArea' && status.delivery === 'Cancelado' && (
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
                        value={status.delivery}
                        defaultValue=" "
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            delivery: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value=" ">--</MenuItem>
                        <MenuItem value="Agendado">
                          <FaRegClock className={faRegClock} />
                          Agendado com o cliente
                        </MenuItem>
                        <MenuItem value="Andamento">
                          <HiOutlineRefresh
                            className={`hiRefresh ${hiRefresh}`}
                          />
                          Em andamento
                        </MenuItem>
                        <MenuItem value="Concluído">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          Concluído
                        </MenuItem>
                        <MenuItem value="Cancelado">
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
                {from === 'Comercial' && (
                  <>
                    <Form ref={paymentWayRef} onSubmit={submitPaymentWay}>
                      <InputAsText
                        name="paymentWayData"
                        onBlur={onPaymentWaySubmit}
                        defaultValue={paymentWay}
                      />
                    </Form>
                    <Form ref={dueDateRef} onSubmit={submitDueDate}>
                      <InputAsText
                        name="dueDateData"
                        onBlur={onDueDateSubmit}
                        defaultValue={dueDate}
                      />
                    </Form>
                  </>
                )}
                {from === 'Billing' && (
                  <>
                    <p>{paymentWay}</p>
                    <p>{dueDate}</p>
                  </>
                )}
                {from === 'TechnicalArea' && (
                  <>
                    <p>--</p>
                    <p>--</p>
                  </>
                )}
                {from !== 'Billing' && status.billing === ' ' && <p>--</p>}
                {from !== 'Billing' && status.billing === 'Aguardando' && (
                  <div className="status">
                    <FaRegClock className={faRegClock} />
                    <span>Aguardando para Faturar</span>
                  </div>
                )}
                {from !== 'Billing' && status.billing === 'Faturado' && (
                  <div className="status">
                    <FaCheckCircle className={`faCheck ${faCheck}`} />
                    <span>Faturado</span>
                  </div>
                )}
                {from !== 'Billing' && status.billing === 'Cancelado' && (
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
                        value={status.billing}
                        defaultValue=" "
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            billing: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value=" ">--</MenuItem>
                        <MenuItem value="Aguardando">
                          <FaRegClock className={faRegClock} />
                          Aguardando para Faturar
                        </MenuItem>
                        <MenuItem value="Faturado">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          Faturado
                        </MenuItem>
                        <MenuItem value="Cancelado">
                          <FaTimes className={faTimes} />
                          Cancelado
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Status>
                )}
                {from !== 'Billing' && status.payment === ' ' && <p>--</p>}
                {from !== 'Billing' && status.payment === 'Aguardando' && (
                  <div className="status">
                    <FaRegClock className={faRegClock} />
                    <span>Aguardando Pagamento</span>
                  </div>
                )}
                {from !== 'Billing' && status.payment === 'Pago' && (
                  <div className="status">
                    <FaCheckCircle className={`faCheck ${faCheck}`} />
                    <span>Pago</span>
                  </div>
                )}
                {from !== 'Billing' && status.payment === 'Cancelado' && (
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
                        value={status.payment}
                        defaultValue=" "
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            billing: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value=" ">--</MenuItem>
                        <MenuItem value="Aguardando">
                          <FaRegClock className={faRegClock} />
                          Aguardando Pagamento
                        </MenuItem>
                        <MenuItem value="Pago">
                          <FaCheckCircle className={`faCheck ${faCheck}`} />
                          Pago
                        </MenuItem>
                        <MenuItem value="Cancelado">
                          <FaTimes className={faTimes} />
                          Cancelado
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Status>
                )}
              </DataForm>
            </BillingData>
          </SecondaryContent>
          <ServicesOrderContent>
            <TitleRow>
              <ServiceName>SERVIÇO</ServiceName>
              <ServiceDescription>DESCRIÇÃO DO SERVIÇO</ServiceDescription>
              <ServiceValue>VALOR</ServiceValue>
            </TitleRow>
            {services &&
              services.length > 0 &&
              services.map((service) => (
                <ServiceRow color={color} key={service.id}>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceValue>
                    <div>
                      <span>R$</span>
                      <span>{formatValue(service.value)}</span>
                    </div>
                    {from === 'Comercial' && (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleEditServiceItem(service)}
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
                          type="button"
                          onClick={() => handleDeleteServiceItem(service.id)}
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
                </ServiceRow>
              ))}
          </ServicesOrderContent>
        </ThemeProvider>
      </Container>
    </OrderOverlap>
  );
};

export default Order;
