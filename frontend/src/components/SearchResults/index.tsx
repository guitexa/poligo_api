import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { FaCheckCircle, FaRegClock, FaTimes } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

import formatValue from '../../utils/formatValue';

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
  Seller,
  Value,
  Status,
} from './styles';

export interface SearchResult {
  date: Date;
  formattedDate: string;
  companyName: string;
  service: string;
  seller: string;
  value: number;
  formattedValue: string;
  status: 'Aguardando' | 'Aprovado' | 'Cancelado';
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

  const searchResults: SearchResult[] = [
    {
      date: new Date(2020, 5, 12),
      formattedDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName:
        'IberdrolaHon Hai Precision Goldman Sachs Group Company State',
      service: 'PCA',
      seller: 'Christiane',
      value: 3575,
      formattedValue: formatValue(3575),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 5, 12),
      formattedDate: format(new Date(2020, 5, 12), 'dd/MM/yyyy'),
      companyName: 'Anheuser-Busch InBev',
      service:
        'PCMAT - Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção Civil',
      seller: 'Christiane',
      value: 1500,
      formattedValue: formatValue(1500),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 5, 10),
      formattedDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Brookfield Asset Management',
      service: 'Treinamento designado de Cipa',
      seller: 'Christiane',
      value: 200,
      formattedValue: formatValue(200),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 5, 10),
      formattedDate: format(new Date(2020, 5, 10), 'dd/MM/yyyy'),
      companyName: 'Charter Communications',
      service: 'Adendo PPRA/PCMSO',
      seller: 'Christiane',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Dell Technologies',
      service: '01 PCMSO',
      seller: 'Christiane',
      value: 150,
      formattedValue: formatValue(150),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 5, 9),
      formattedDate: format(new Date(2020, 5, 9), 'dd/MM/yyyy'),
      companyName: 'Johnson & Johnson',
      service: 'PPR',
      seller: 'Tainara',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
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
      date: new Date(2020, 5, 4),
      formattedDate: format(new Date(2020, 5, 4), 'dd/MM/yyyy'),
      companyName: 'Minsheng BankBritish American Tobacco',
      service: 'Visita técnica',
      seller: 'Christiane',
      value: 600,
      formattedValue: formatValue(600),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 4, 28),
      formattedDate: format(new Date(2020, 4, 28), 'dd/MM/yyyy'),
      companyName: 'RCM Engenharia e Construções',
      service: 'Treinamento',
      seller: 'Christiane',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
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
      date: new Date(2020, 4, 20),
      formattedDate: format(new Date(2020, 4, 20), 'dd/MM/yyyy'),
      companyName: 'UnileverCountry Garden Holdings',
      service: 'Treinamento',
      seller: 'Tainara',
      value: 300,
      formattedValue: formatValue(300),
      status: 'Aprovado',
    },
    {
      date: new Date(2020, 4, 14),
      formattedDate: format(new Date(2020, 4, 14), 'dd/MM/yyyy'),
      companyName: 'Shanghai Pudong Development',
      service: 'Adendo',
      seller: 'Christiane',
      value: 100,
      formattedValue: formatValue(100),
      status: 'Aprovado',
    },
    {
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
      date: new Date(2020, 4, 11),
      formattedDate: format(new Date(2020, 4, 11), 'dd/MM/yyyy'),
      companyName: 'Walgreens Boots Alliance',
      service: 'PCMSO',
      seller: 'Christiane',
      value: 150,
      formattedValue: formatValue(150),
      status: 'Aprovado',
    },
    {
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
      date: new Date(2020, 4, 5),
      formattedDate: format(new Date(2020, 4, 5), 'dd/MM/yyyy'),
      companyName: 'Lloyds Pacific InsuranceSAIC Motor',
      service: 'PCA',
      seller: 'Christiane',
      value: 500,
      formattedValue: formatValue(500),
      status: 'Aprovado',
    },
  ];

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
            hasServices
            from={from}
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
              key={result.formattedValue}
            >
              <DateField>{result.formattedDate}</DateField>
              <CompanyName>{result.companyName}</CompanyName>
              <Service>{result.service}</Service>
              <Seller>{result.seller}</Seller>
              <Value>
                <div>R$</div>
                <div>{result.formattedValue}</div>
              </Value>
              <Status>{statusReturn(result.status)}</Status>
            </RowResult>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default SearchResults;
