import React, { useCallback, useEffect, useState } from 'react';
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

import { SearchResult } from '../SearchResults';
import formatValue from '../../utils/formatValue';

import MaterialTooltip from '../MaterialTooltip';
import NewService from '../NewService';

import {
  OrderOverlapping,
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
}

interface OrderProps {
  color: string;
  newServiceOpen: boolean;
  setNewServiceOpen(e: boolean): void;
  data: SearchResult;
  from: string;
}

const Order: React.FC<OrderProps> = ({
  color,
  newServiceOpen,
  setNewServiceOpen,
  data,
  from,
}) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceData>(
    {} as ServiceData
  );
  const [status, setStatus] = useState<StatusState>({
    order: 'Aprovado',
    delivery: 'Andamento',
    billing: 'Faturado',
  });

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
    }
  }, [data]);

  const handleDeleteServiceItem = useCallback((serviceID: string) => {
    setServices((state) => state.filter((service) => service.id !== serviceID));
  }, []);

  const handleEditServiceItem = useCallback(
    (dataToEdit: ServiceData) => {
      setServiceToEdit(dataToEdit);
      setNewServiceOpen(!newServiceOpen);
    },
    [newServiceOpen, setNewServiceOpen]
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

  return (
    <>
      {newServiceOpen && (
        <OrderOverlapping>
          <NewService
            color={color}
            setNewServiceOpen={(e) => setNewServiceOpen(e)}
            setServices={(e) => setServices((state) => [...state, e])}
            setEditedServices={(e) => handleEditedService(e)}
            serviceToEdit={serviceToEdit}
            setServiceToEdit={(e) => setServiceToEdit(e)}
          />
        </OrderOverlapping>
      )}
      <Container>
        <ThemeProvider theme={defaultMaterialTheme}>
          <PrimaryContent>
            <CompanyData>
              <TitlesForm>
                <p>Razão social:</p>
                <p>CNPJ:</p>
                <p>Contato:</p>
                <p>E-mail:</p>
                <p>Telefone:</p>
                <p>WhatsApp:</p>
              </TitlesForm>
              <DataForm>
                <p>{data.companyName}</p>
                <p>08.692.756/0001-50</p>
                <p>Marcella</p>
                <p>emusa@uol.com.br</p>
                <p>(34) 3314-5339</p>
                <p>(34) 9 8834-5339</p>
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
                <p>6478</p>
                <p>{data.seller}</p>
                {from === 'Comercial' || from === 'Billing' ? (
                  <p>R${data.formattedValue}</p>
                ) : (
                  <p>--</p>
                )}
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
                <p>--</p>
              </DataForm>
            </OrderData>
          </PrimaryContent>
          <SecondaryContent>
            {from === 'Comercial' && (
              <AddServiceButton
                type="button"
                color={color}
                onClick={() => setNewServiceOpen(!newServiceOpen)}
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
                <p>Data de entrega prevista:</p>
                <p>Status área técnica:</p>
              </TitlesForm>
              <DataForm>
                <p>Aguardar pagamento da segunda parcela</p>
                <p>30/06/2020</p>
                <p>--</p>
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
                    <span>Concluído em 30/06/2020</span>
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
                          Concluído em 30/06/2020
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
                <p>Emitir NF:</p>
                <p>Vencimento:</p>
                <p>Status financeiro:</p>
              </TitlesForm>
              <DataForm>
                {from === 'Comercial' || from === 'Billing' ? (
                  <>
                    <p>1+3x R$1.325,00</p>
                    <p>Não</p>
                    <p>Entrada para 16/06 e parcelas junto com faturamento</p>
                  </>
                ) : (
                  <>
                    <p>--</p>
                    <p>--</p>
                    <p>--</p>
                  </>
                )}
                {from !== 'Billing' && status.billing === ' ' && <p>--</p>}
                {from !== 'Billing' && status.billing === 'Aguardando' && (
                  <div className="status">
                    <FaRegClock className={faRegClock} />
                    <span>Aguardando para faturar</span>
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
                          Aguardando para faturar
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
    </>
  );
};

export default Order;
