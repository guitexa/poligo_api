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
} from 'react-icons/fa';

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
  name: string;
  description: string;
  value: string;
}

interface OrderProps {
  color: string;
  newServiceOpen: boolean;
  setNewServiceOpen(e: boolean): void;
  companyName: string;
  companyCpfCnpj: string;
  companyNameContact: string;
  companyEmailContact: string;
  companyPhone: string;
  companyMobilePhoneContact: string;
  hasServices?: boolean;
}

const Order: React.FC<OrderProps> = ({
  color,
  newServiceOpen,
  setNewServiceOpen,
  companyName,
  companyCpfCnpj,
  companyNameContact,
  companyEmailContact,
  companyPhone,
  companyMobilePhoneContact,
  hasServices,
}) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [status, setStatus] = useState('Aprovado');

  useEffect(() => {
    if (hasServices) {
      const sample = {
        name: 'LTCAT',
        description: 'Medições de calor e ruído',
        value: '11.800,00',
      };

      setServices((state) => [...state, sample]);
    }
  }, [hasServices]);

  const handleDeleteServiceItem = useCallback((serviceName: string) => {
    setServices((state) =>
      state.filter((service) => service.name !== serviceName)
    );
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
        margin: '0 4px 0 -2px',
      },
      faRegClock: {
        color: '#999',
        margin: '0 4px 0 -2px',
      },
      faTimes: {
        color: '#f00',
        fontSize: '15px',
        margin: '0 4px 0 -2px',
      },
    })
  );

  const { formControl, faCheck, faRegClock, faTimes } = useStyles();

  return (
    <>
      {newServiceOpen && (
        <OrderOverlapping>
          <NewService
            color={color}
            setNewServiceOpen={(e) => setNewServiceOpen(e)}
            setServices={(e) => setServices((state) => [...state, e])}
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
                <p>{companyName}</p>
                <p>{companyCpfCnpj}</p>
                <p>{companyNameContact}</p>
                <p>{companyEmailContact}</p>
                <p>{companyPhone}</p>
                <p>{companyMobilePhoneContact}</p>
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
                <p>Christiane de Araujo</p>
                <p>R$1.500,00</p>
                <p>12/06/2020</p>
                <Status>
                  <FormControl className={formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as string)}
                    >
                      <MenuItem value="Aprovado">
                        <FaCheckCircle className={faCheck} />
                        Aprovado
                      </MenuItem>
                      <MenuItem value="Aguardando cliente">
                        <FaRegClock className={faRegClock} />
                        Aguardando cliente
                      </MenuItem>
                      <MenuItem value="Encerrado">
                        <FaTimes className={faTimes} />
                        Encerrado
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Status>
                <p>--</p>
              </DataForm>
            </OrderData>
          </PrimaryContent>
          <SecondaryContent>
            <AddServiceButton
              type="button"
              color={color}
              onClick={() => setNewServiceOpen(!newServiceOpen)}
            >
              <MaterialTooltip title="Adicionar Serviço" arrow placement="top">
                <FaPlus />
              </MaterialTooltip>
            </AddServiceButton>
            <DeliveryData>
              <TitlesForm>
                <p>Condições de entrega:</p>
                <p>Data de entrega solicitada:</p>
                <p>Data de entrega:</p>
                <p>Status área técnica:</p>
              </TitlesForm>
              <DataForm>
                <p>Aguardar pagamento da segunda parcela</p>
                <p>30/06/2020</p>
                <p>--</p>
                <p>--</p>
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
                <p>1+3x R$1.325,00</p>
                <p>Não</p>
                <p>Entrada para 16/06 e parcelas junto com faturamento</p>
                <p>--</p>
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
                <ServiceRow color={color} key={service.name}>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceValue>
                    <div>
                      <span>R$</span>
                      <span>{service.value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteServiceItem(service.name)}
                    >
                      <MaterialTooltip title="Excluir" arrow placement="left">
                        <FaTrashAlt />
                      </MaterialTooltip>
                    </button>
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
