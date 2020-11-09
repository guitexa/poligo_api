import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { RiDraftFill } from 'react-icons/ri';
import {
  FaCalendarTimes,
  FaCheckCircle,
  FaRegClock,
  FaTimes,
} from 'react-icons/fa';
import { IoMdThumbsDown } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IconBaseProps } from 'react-icons';
import { formatToDate } from 'brazilian-values';
import convertDate from '../../utils/convertDate';

import formatValue from '../../utils/formatValue';
import { useSearch } from '../../hooks/search';
import { useOverlap } from '../../hooks/overlap';

import Order from '../Order';
import api from '../../services/api';

import {
  OrderOverlap,
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
import { useAuth } from '../../hooks/auth';

interface ClientData {
  company_name: string;
  cpf_cnpj: string;
  contact_name: string;
  email: string;
  phone: string;
  mobile: string;
}

interface SellerData {
  name: string;
}

interface TechnicalData {
  name: string;
}

interface ServiceData {
  id: string;
  name: string;
}

export interface ServiceOrderData {
  id: string;
  product: ServiceData;
  product_description: string;
  product_value: string;
  created_at: string;
}

export interface OrderDataType {
  id: string;
  order_number: number;
  status_order:
    | 'Rascunho'
    | 'Aguardando'
    | 'Reprovado'
    | 'Aprovado'
    | 'Cancelado'
    | unknown;
  approved_at?: string;
  delivery_conditions?: string;
  requested_delivery_date?: string;
  delivery_date?: string;
  status_delivery?:
    | ''
    | 'Agendado'
    | 'Execução'
    | 'Concluído'
    | 'Cancelado'
    | unknown;
  payment_way?: string;
  due_date?: string;
  status_billing?: '' | 'Aguardando' | 'Faturado' | 'Cancelado' | unknown;
  status_payment?: '' | 'Aguardando' | 'Pago' | 'Vencido' | unknown;
  created_at: string;
  client: ClientData;
  seller: SellerData;
  technical?: TechnicalData;
  orders_products?: ServiceOrderData[];
}

export interface UpdateSearchResultsData {
  order_id: string;
  status_order?: string | unknown;
  status_delivery?: string | unknown;
  status_billing?: string | unknown;
  status_payment?: string | unknown;
  delivery_date?: string | undefined;
  technical?: string;
  product_id_add?: ServiceOrderData;
  product_id_update?: ServiceOrderData;
  order_product_id_delete?: string;
}

interface SearchResultsProps {
  color: string;
  from: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ color, from }) => {
  const [orderIdOpen, setOrderIdOpen] = useState('');
  const [searchResults, setSearchResults] = useState<OrderDataType[]>([]);
  const [updateSearchResults, setUpdateSearchResults] = useState<
    UpdateSearchResultsData
  >({} as UpdateSearchResultsData);

  useEffect(() => {
    if (updateSearchResults.order_id && searchResults) {
      const getOrderIndex = searchResults.findIndex(
        (result) => result.id === updateSearchResults.order_id
      );

      if (searchResults[getOrderIndex]) {
        if (updateSearchResults.status_order) {
          searchResults[getOrderIndex].status_order =
            updateSearchResults.status_order;
        }

        if (updateSearchResults.status_delivery) {
          searchResults[getOrderIndex].status_delivery =
            updateSearchResults.status_delivery;
        }

        if (updateSearchResults.status_billing) {
          searchResults[getOrderIndex].status_billing =
            updateSearchResults.status_billing;
        }

        if (updateSearchResults.status_payment) {
          searchResults[getOrderIndex].status_payment =
            updateSearchResults.status_payment;
        }

        if (updateSearchResults.delivery_date) {
          searchResults[getOrderIndex].delivery_date = convertDate(
            updateSearchResults.delivery_date
          );
        } else if (updateSearchResults.delivery_date === undefined) {
          searchResults[getOrderIndex].delivery_date =
            updateSearchResults.delivery_date;
        }

        if (updateSearchResults.technical) {
          searchResults[getOrderIndex].technical = {
            name: updateSearchResults.technical,
          };
        }

        if (updateSearchResults.product_id_add) {
          searchResults[getOrderIndex].orders_products?.push(
            updateSearchResults.product_id_add
          );
        }

        if (updateSearchResults.order_product_id_delete) {
          const getOrderProductIndex = searchResults[
            getOrderIndex
          ].orders_products?.findIndex(
            (result) =>
              result.id === updateSearchResults.order_product_id_delete
          );

          if (getOrderProductIndex !== undefined) {
            searchResults[getOrderIndex].orders_products?.splice(
              getOrderProductIndex,
              1
            );
          }
        }

        if (updateSearchResults.product_id_update) {
          const getOrderProductIndex = searchResults[
            getOrderIndex
          ].orders_products?.findIndex(
            (result) => result.id === updateSearchResults.product_id_update?.id
          );

          if (getOrderProductIndex !== undefined) {
            searchResults[getOrderIndex].orders_products?.splice(
              getOrderProductIndex,
              1
            );

            searchResults[getOrderIndex].orders_products?.push(
              updateSearchResults.product_id_update
            );
          }
        }
      }
      setUpdateSearchResults({} as UpdateSearchResultsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSearchResults.order_id]);

  const servicesToShow = useCallback(
    (order_id: string): string[] => {
      const getOrderIndex = searchResults.findIndex(
        (result) => result.id === order_id
      );

      if (searchResults[getOrderIndex].orders_products) {
        const servicesToString = searchResults[getOrderIndex].orders_products
          ?.sort((a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
            return 0;
          })
          .map((item) => `${item.product.name}, `);

        const lastItemFormatted = servicesToString?.pop()?.slice(0, -2);
        lastItemFormatted &&
          servicesToString &&
          servicesToString.push(lastItemFormatted);

        return servicesToString || [];
      }

      return [];
    },
    [searchResults]
  );

  const servicesValuesToShow = useCallback(
    (order_id: string): string => {
      const getOrderIndex = searchResults.findIndex(
        (result) => result.id === order_id
      );

      if (searchResults[getOrderIndex].orders_products) {
        const servicesValues = searchResults[getOrderIndex].orders_products
          ?.map((service) => Number(service.product_value))
          .reduce((accumulator, serviceValue) => {
            return accumulator + serviceValue;
          }, 0);

        return servicesValues ? formatValue(servicesValues) : '';
      }

      return '';
    },
    [searchResults]
  );

  // const {
  //   selectedDate,
  //   selectedDeliveryDate,
  //   companyName,
  //   service,
  //   seller,
  //   technical,
  //   value,
  //   status,
  // } = useSearch();

  const { orderOpen, overlapOrderOpen } = useOverlap();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.get<OrderDataType[]>('/orders').then((response) => {
        const sortedResponse = response.data.sort((a, b) => {
          if (a.created_at < b.created_at) return 1;
          if (a.created_at > b.created_at) return -1;
          return 0;
        });
        setSearchResults(sortedResponse);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (selectedDate && isValid(selectedDate)) {
  //   const formattedDate = format(selectedDate, 'dd/MM/yyyy');

  //   searchResults = searchResults.filter((i) => {
  //     return i.formattedDate.match(formattedDate);
  //   });
  // }

  // if (selectedDeliveryDate && isValid(selectedDeliveryDate)) {
  //   const formattedDeliveryDate = format(selectedDeliveryDate, 'dd/MM/yyyy');

  //   searchResults = searchResults.filter((i) => {
  //     return i.formattedDeliveryDate?.match(formattedDeliveryDate);
  //   });
  // }

  // if (companyName.length > 2) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.companyName.toLowerCase().match(companyName.toLowerCase());
  //   });
  // }

  // if (service.length > 2) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.service?.toLowerCase().match(service.toLowerCase());
  //   });
  // }

  // if (seller) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.seller?.toLowerCase().match(seller.toLowerCase());
  //   });
  // }

  // if (technical) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.technical?.toLowerCase().match(technical.toLowerCase());
  //   });
  // }

  // if (value.length > 4) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.formattedValue
  //       ?.toLowerCase()
  //       .match(formatValue(Number(value)).toLowerCase());
  //   });
  // }

  // if (status) {
  //   searchResults = searchResults.filter((i) => {
  //     return i.status?.toLowerCase().match(status.toLowerCase());
  //   });
  // }

  const statusReturn = useCallback((sts: string | unknown):
    | IconBaseProps
    | undefined => {
    if (sts === 'Rascunho') {
      return <RiDraftFill className="riDraftFill" />;
    }
    if (sts === 'Aguardando' || sts === 'Agendado') {
      return <FaRegClock className="faRegClock" />;
    }
    if (sts === 'Execução') {
      return <HiOutlineRefresh className="hiRefresh" />;
    }
    if (sts === 'Reprovado') {
      return <IoMdThumbsDown className="ioThumbsDown" />;
    }
    if (
      sts === 'Aprovado' ||
      sts === 'Pago' ||
      sts === 'Concluído' ||
      sts === 'Faturado'
    ) {
      return <FaCheckCircle className="faCheck" />;
    }
    if (sts === 'Vencido') {
      return <FaCalendarTimes className="faCalendarTimes" />;
    }
    if (sts === 'Cancelado') {
      return <FaTimes className="faTimes" />;
    }
    return undefined;
  }, []);

  const handleOpenOrder = useCallback(
    (order_id: string | undefined) => {
      if (order_id) {
        setOrderIdOpen(order_id);
        overlapOrderOpen(!orderOpen);
      }
    },
    [orderOpen, overlapOrderOpen]
  );

  const searchResultsTechnicalAreaFiltered = useMemo(() => {
    return searchResults.filter(
      (search) => search.status_delivery || search.status_order === 'Aprovado'
    );
  }, [searchResults]);

  const searchResultsBillingFiltered = useMemo(() => {
    return searchResults.filter(
      (search) =>
        search.status_billing ||
        search.status_payment ||
        search.status_order === 'Aprovado'
    );
  }, [searchResults]);

  return (
    <>
      {orderOpen && (
        <OrderOverlap>
          <Order
            color={color}
            order_id={orderIdOpen}
            from={from}
            updateSearchResults={(e) => setUpdateSearchResults(e)}
          />
        </OrderOverlap>
      )}
      <Container>
        <Content>
          {(from === 'TechnicalArea'
            ? searchResultsTechnicalAreaFiltered
            : from === 'Billing'
            ? searchResultsBillingFiltered
            : searchResults
          ).map((search: OrderDataType) => (
            <RowResult
              type="button"
              color={color}
              onClick={() => handleOpenOrder(search.id)}
              key={search.id}
            >
              <DateField>{formatToDate(parseISO(search.created_at))}</DateField>
              <CompanyName>{search.client.company_name}</CompanyName>
              <Service>{servicesToShow(search.id)}</Service>
              {(from === 'Comercial' || from === 'Billing') && (
                <>
                  <Professional>{search.seller.name}</Professional>
                  <Value>
                    <div>
                      {search.orders_products && search.orders_products.length
                        ? 'R$'
                        : ''}
                    </div>
                    <div>{servicesValuesToShow(search.id)}</div>
                  </Value>
                </>
              )}
              {from === 'TechnicalArea' && (
                <>
                  <Professional>
                    {search.technical ? search.technical.name : ''}
                  </Professional>
                  <DateField>
                    {search.delivery_date
                      ? formatToDate(parseISO(search.delivery_date))
                      : ''}
                  </DateField>
                </>
              )}
              <Status>
                {from === 'Comercial' && search.status_order
                  ? statusReturn(search.status_order)
                  : ''}
                {from === 'Billing' && search.status_billing
                  ? statusReturn(search.status_billing)
                  : ''}
                {from === 'TechnicalArea' && search.status_delivery
                  ? statusReturn(search.status_delivery)
                  : ''}
              </Status>
            </RowResult>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default SearchResults;
