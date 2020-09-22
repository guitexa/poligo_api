import React, { useEffect, useState } from 'react';

import { FaPlus, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';

import MaterialTooltip from '../MaterialTooltip';
import NewService from '../NewService';

import {
  OrderOverlapping,
  Container,
  PrimaryContent,
  CompanyData,
  OrderData,
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
              <p>
                <FaRegClock />
                <span>Aguardando cliente</span>
                <TiArrowSortedDown />
              </p>
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
              <ServiceRow color={color}>
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceValue>
                  <div>
                    <span>R$</span>
                    <span>{service.value}</span>
                  </div>
                  <button type="button">
                    <MaterialTooltip title="Excluir" arrow placement="left">
                      <FaTrashAlt />
                    </MaterialTooltip>
                  </button>
                </ServiceValue>
              </ServiceRow>
            ))}
        </ServicesOrderContent>
      </Container>
    </>
  );
};

export default Order;
