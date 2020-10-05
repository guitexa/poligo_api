import React, { useState, useCallback } from 'react';
import { format, isValid } from 'date-fns';
import { FaCheckCircle, FaRegClock, FaTimes } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

import formatValue from '../../utils/formatValue';
import { useSearch } from '../../hooks/search';

import Order from '../Order';
import HeaderButton from '../HeaderButton';

import {
  OrderOverlapping,
  Container,
  Content,
  RowResult,
  DateField,
  CompanyName,
  Service,
  Professional,
  Value,
  Status,
} from './styles';

export interface SearchResult {
  id: string;
  date: Date;
  formattedDate: string;
  deliveryDate?: Date;
  formattedDeliveryDate?: string;
  companyName: string;
  service?: string;
  seller: string;
  technical?: string;
  value?: number;
  formattedValue?: string;
  status?: 'Aguardando' | 'Aprovado' | 'Cancelado';
}

interface SearchResultsProps {
  color: string;
  orderOpen: boolean;
  setOrderOpen(e: boolean): void;
  from: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  color,
  orderOpen,
  setOrderOpen,
  from,
}) => {
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState<SearchResult>({} as SearchResult);

  const {
    selectedDate,
    selectedDeliveryDate,
    companyName,
    service,
    seller,
    technical,
    value,
    status,
  } = useSearch();

  let searchResults: SearchResult[] = [
    {
      id: '1',
      date: new Date(2020, 5, 12),
      formattedDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName:
        'IberdrolaHon Hai Precision Goldman Sachs Group Company State',
      service: 'PCA',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 3575,
      formattedValue: formatValue(3575),
      status: 'Aprovado',
    },
    {
      id: '2',
      date: new Date(2020, 4, 12),
      formattedDate: format(new Date(2020, 4, 12), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 12),
      formattedDeliveryDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName: 'Anheuser-Busch InBev',
      service:
        'PCMAT - Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção Civil',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 1500,
      formattedValue: formatValue(1500),
      status: 'Aprovado',
    },
    {
      id: '3',
      date: new Date(2020, 4, 12),
      formattedDate: format(new Date(2020, 4, 12), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 10),
      formattedDeliveryDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Brookfield Asset Management',
      service: 'Treinamento designado de Cipa',
      seller: 'Christiane',
      technical: 'Aline',
      value: 200,
      formattedValue: formatValue(200),
      status: 'Aprovado',
    },
    {
      id: '4',
      date: new Date(2020, 5, 10),
      formattedDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 10),
      formattedDeliveryDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Charter Communications',
      service: 'Adendo PPRA/PCMSO',
      seller: 'Christiane',
      technical: 'Aline',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '5',
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 9),
      formattedDeliveryDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Dell Technologies',
      service: '01 PCMSO',
      seller: 'Christiane',
      technical: 'Aline',
      value: 150,
      formattedValue: formatValue(150),
      status: 'Aprovado',
    },
    {
      id: '6',
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 9),
      formattedDeliveryDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Johnson & Johnson',
      service: 'PPR',
      seller: 'Tainara',
      technical: 'Aline',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
      id: '7',
      date: new Date(2020, 5, 4),
      formattedDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      companyName: 'MetLifeSumitomo Mitsui Financial',
      service: 'Treinamento designado de Cipa',
      seller: 'Christiane',
      value: 800,
      formattedValue: formatValue(800),
      status: 'Aguardando',
    },
    {
      id: '8',
      date: new Date(2020, 5, 4),
      formattedDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 4),
      formattedDeliveryDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      companyName: 'Minsheng BankBritish American Tobacco',
      service: 'Visita técnica',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
      id: '9',
      date: new Date(2020, 4, 28),
      formattedDate: format(new Date(2020, 4, 28), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 28),
      formattedDeliveryDate: format(new Date(2020, 4, 28), 'dd/MM/yyyy'),
      companyName: 'RCM Engenharia e Construções',
      service: 'Treinamento',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '10',
      date: new Date(2020, 4, 20),
      formattedDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      companyName: 'Verizon CommunicationsRoyal Dutch Shell',
      service: 'Treinamento de NR-12',
      seller: 'Christiane',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Cancelado',
    },
    {
      id: '11',
      date: new Date(2020, 4, 20),
      formattedDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 20),
      formattedDeliveryDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      companyName: 'UnileverCountry Garden Holdings',
      service: 'Treinamento',
      seller: 'Tainara',
      technical: 'Leandro',
      value: 300,
      formattedValue: formatValue(300),
      status: 'Aprovado',
    },
    {
      id: '12',
      date: new Date(2020, 4, 14),
      formattedDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 14),
      formattedDeliveryDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      companyName: 'Shanghai Pudong Development',
      service: 'Adendo',
      seller: 'Christiane',
      technical: 'Aline',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '13',
      date: new Date(2020, 4, 14),
      formattedDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      companyName: 'LVMH Moët Hennessy Louis Vuitton',
      service: 'Treinamentos',
      seller: 'Christiane',
      value: 500,
      formattedValue: formatValue(500),
      status: 'Aguardando',
    },
    {
      id: '14',
      date: new Date(2020, 4, 11),
      formattedDate: format(new Date(2020, 4, 11), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 11),
      formattedDeliveryDate: format(new Date(2020, 4, 11), 'dd/MM/yyyy'),
      companyName: 'Walgreens Boots Alliance',
      service: 'PCMSO',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 150,
      formattedValue: formatValue(150),
      status: 'Aprovado',
    },
    {
      id: '15',
      date: new Date(2020, 4, 7),
      formattedDate: format(new Date(2020, 4, 7), 'dd/MM/yyyy'),
      companyName: 'Saudi Arabian Oil Company',
      service: 'AET',
      seller: 'Christiane',
      value: 1150,
      formattedValue: formatValue(1150),
      status: 'Aguardando',
    },
    {
      id: '16',
      date: new Date(2020, 4, 6),
      formattedDate: format(new Date(2020, 4, 6), 'dd/MM/yyyy'),
      companyName: 'Commonwealth State Construction Engineering',
      service: 'PPRA e PCMSO Mosaic',
      seller: 'Tainara',
      value: 1400,
      formattedValue: formatValue(1400),
      status: 'Cancelado',
    },
    {
      id: '17',
      date: new Date(2020, 4, 5),
      formattedDate: format(new Date(2020, 4, 5), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 5),
      formattedDeliveryDate: format(new Date(2020, 4, 5), 'dd/MM/yyyy'),
      companyName: 'Lloyds Pacific InsuranceSAIC Motor',
      service: 'PCA',
      seller: 'Christiane',
      technical: 'Aline',
      value: 500,
      formattedValue: formatValue(500),
      status: 'Aprovado',
    },
    {
      id: '18',
      date: new Date(2020, 5, 12),
      formattedDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 12),
      formattedDeliveryDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName:
        'IberdrolaHon Hai Precision Goldman Sachs Group Company State',
      service: 'PCA',
      seller: 'Christiane',
      technical: 'Aline',
      value: 3575,
      formattedValue: formatValue(3575),
      status: 'Aprovado',
    },
    {
      id: '19',
      date: new Date(2020, 5, 12),
      formattedDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 12),
      formattedDeliveryDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName: 'Anheuser-Busch InBev',
      service:
        'PCMAT - Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção Civil',
      seller: 'Christiane',
      technical: 'Aline',
      value: 1500,
      formattedValue: formatValue(1500),
      status: 'Aprovado',
    },
    {
      id: '20',
      date: new Date(2020, 5, 10),
      formattedDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 10),
      formattedDeliveryDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Brookfield Asset Management',
      service: 'Treinamento designado de Cipa',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 200,
      formattedValue: formatValue(200),
      status: 'Aprovado',
    },
    {
      id: '21',
      date: new Date(2020, 5, 10),
      formattedDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 10),
      formattedDeliveryDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Charter Communications',
      service: 'Adendo PPRA/PCMSO',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '22',
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 9),
      formattedDeliveryDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Dell Technologies',
      service: '01 PCMSO',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 150,
      formattedValue: formatValue(150),
      status: 'Aprovado',
    },
    {
      id: '23',
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 9),
      formattedDeliveryDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Johnson & Johnson',
      service: 'PPR',
      seller: 'Tainara',
      technical: 'Aline',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
      id: '24',
      date: new Date(2020, 5, 4),
      formattedDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      companyName: 'MetLifeSumitomo Mitsui Financial',
      service: 'Treinamento designado de Cipa',
      seller: 'Christiane',
      value: 800,
      formattedValue: formatValue(800),
      status: 'Aguardando',
    },
    {
      id: '25',
      date: new Date(2020, 5, 4),
      formattedDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 5, 4),
      formattedDeliveryDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      companyName: 'Minsheng BankBritish American Tobacco',
      service: 'Visita técnica',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
      id: '26',
      date: new Date(2020, 4, 28),
      formattedDate: format(new Date(2020, 4, 28), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 28),
      formattedDeliveryDate: format(new Date(2020, 4, 28), 'dd/MM/yyyy'),
      companyName: 'RCM Engenharia e Construções',
      service: 'Treinamento',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '27',
      date: new Date(2020, 4, 20),
      formattedDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      companyName: 'Verizon CommunicationsRoyal Dutch Shell',
      service: 'Treinamento de NR-12',
      seller: 'Christiane',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Cancelado',
    },
    {
      id: '28',
      date: new Date(2020, 4, 20),
      formattedDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 20),
      formattedDeliveryDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      companyName: 'UnileverCountry Garden Holdings',
      service: 'Treinamento',
      seller: 'Tainara',
      technical: 'Aline',
      value: 300,
      formattedValue: formatValue(300),
      status: 'Aprovado',
    },
    {
      id: '29',
      date: new Date(2020, 4, 14),
      formattedDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      deliveryDate: new Date(2020, 4, 14),
      formattedDeliveryDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      companyName: 'Shanghai Pudong Development',
      service: 'Adendo',
      seller: 'Christiane',
      technical: 'Leandro',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      id: '30',
      date: new Date(2020, 4, 14),
      formattedDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      companyName: 'LVMH Moët Hennessy Louis Vuitton',
      service: 'Treinamentos',
      seller: 'Christiane',
      value: 500,
      formattedValue: formatValue(500),
      status: 'Aguardando',
    },
  ];

  if (selectedDate && isValid(selectedDate)) {
    const formattedDate = format(selectedDate, 'dd/MM/yyyy');

    searchResults = searchResults.filter((i) => {
      return i.formattedDate.match(formattedDate);
    });
  }

  if (selectedDeliveryDate && isValid(selectedDeliveryDate)) {
    const formattedDeliveryDate = format(selectedDeliveryDate, 'dd/MM/yyyy');

    searchResults = searchResults.filter((i) => {
      return i.formattedDeliveryDate?.match(formattedDeliveryDate);
    });
  }

  if (companyName.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.companyName.toLowerCase().match(companyName.toLowerCase());
    });
  }

  if (service.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.service?.toLowerCase().match(service.toLowerCase());
    });
  }

  if (seller.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.seller?.toLowerCase().match(seller.toLowerCase());
    });
  }

  if (technical.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.technical?.toLowerCase().match(technical.toLowerCase());
    });
  }

  if (value.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.formattedValue
        ?.toLowerCase()
        .match(formatValue(Number(value)).toLowerCase());
    });
  }

  if (status.length > 0) {
    searchResults = searchResults.filter((i) => {
      return i.status?.toLowerCase().match(status.toLowerCase());
    });
  }

  const statusReturn = useCallback((sts: string): IconBaseProps | undefined => {
    if (sts === 'Aguardando') {
      return <FaRegClock className="fa-clock" />;
    }
    if (sts === 'Aprovado') {
      return <FaCheckCircle className="fa-check" />;
    }
    if (sts === 'Cancelado') {
      return <FaTimes className="fa-times" />;
    }
    return undefined;
  }, []);

  const handleOpenOrder = useCallback(
    (data: SearchResult) => {
      setDataOpen(data);
      setOrderOpen(!orderOpen);
    },
    [orderOpen, setOrderOpen]
  );

  return (
    <>
      {orderOpen && (
        <OrderOverlapping>
          <Order
            color={color}
            newServiceOpen={newServiceOpen}
            setNewServiceOpen={(e) => setNewServiceOpen(e)}
            data={dataOpen}
            from="Comercial"
          />
          <HeaderButton
            show={orderOpen && !newServiceOpen}
            handleClick={(e) => setOrderOpen(!e)}
            type="button"
            icon={FaTimes}
            color={color}
          />
        </OrderOverlapping>
      )}
      <Container>
        <Content>
          {searchResults.map((result) => (
            <RowResult
              type="button"
              color={color}
              onClick={() => handleOpenOrder(result)}
              key={result.id}
            >
              <DateField>{result.formattedDate}</DateField>
              <CompanyName>{result.companyName}</CompanyName>
              <Service>{result.service}</Service>
              {(from === 'Comercial' || from === 'Billing') && (
                <>
                  <Professional>{result.seller}</Professional>
                  <Value>
                    <div>R$</div>
                    <div>{result.formattedValue}</div>
                  </Value>
                </>
              )}
              {from === 'TechnicalArea' && (
                <>
                  <Professional>{result.technical || ''}</Professional>
                  <DateField>{result.formattedDeliveryDate || ''}</DateField>
                </>
              )}
              <Status>
                {result.status ? statusReturn(result.status) : 'Aguardando'}
              </Status>
            </RowResult>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default SearchResults;
