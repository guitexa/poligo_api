import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { parseISO } from 'date-fns';
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
  Product,
  Professional,
  Value,
  Status,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ClientData {
  id: string;
  name: string;
  cpf_cnpj: string;
  contact_name: string;
  email?: string;
  phone: string;
  mobile?: string;
}

interface UserData {
  name: string;
}

interface ProductData {
  id: string;
  name: string;
}

export interface OrderProductData {
  id: string;
  product: ProductData;
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
  seller: UserData;
  technical?: UserData;
  total_value?: string;
  orders_products?: OrderProductData[];
}

export interface UpdateSearchResultsData {
  order_id: string;
  status_order?: string | unknown;
  status_delivery?: string | unknown;
  status_billing?: string | unknown;
  status_payment?: string | unknown;
  delivery_date?: string | undefined;
  technical?: string;
  product_id_add?: OrderProductData;
  product_id_update?: OrderProductData;
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

        if (updateSearchResults.delivery_date?.length === 0) {
          searchResults[getOrderIndex].delivery_date = undefined;
        } else if (
          updateSearchResults.delivery_date &&
          updateSearchResults.delivery_date.length > 0
        ) {
          searchResults[getOrderIndex].delivery_date = convertDate(
            updateSearchResults.delivery_date
          );
        }

        if (updateSearchResults.technical?.length === 0) {
          searchResults[getOrderIndex].technical = undefined;
        } else if (
          updateSearchResults.technical &&
          updateSearchResults.technical.length > 0
        ) {
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

  const productsToShow = useCallback(
    (order_id: string): string[] => {
      const getOrderIndex = searchResults.findIndex(
        (result) => result.id === order_id
      );

      if (searchResults[getOrderIndex].orders_products) {
        const productsToString = searchResults[getOrderIndex].orders_products
          ?.sort((a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
            return 0;
          })
          .map((item) => `${item.product.name}, `);

        const lastItemFormatted = productsToString?.pop()?.slice(0, -2);
        lastItemFormatted &&
          productsToString &&
          productsToString.push(lastItemFormatted);

        return productsToString || [];
      }

      return [];
    },
    [searchResults]
  );

  const totalValue = useCallback(
    (order_id: string): string => {
      const getOrderIndex = searchResults.findIndex(
        (result) => result.id === order_id
      );

      if (searchResults[getOrderIndex].orders_products) {
        const productsValues = searchResults[getOrderIndex].orders_products
          ?.map((product) => Number(product.product_value))
          .reduce((accumulator, productValue) => {
            return accumulator + productValue;
          }, 0);

        return productsValues ? formatValue(productsValues) : '';
      }

      return '';
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchResults, updateSearchResults]
  );

  const {
    company,
    selectedDate,
    selectedDeliveryDate,
    seller,
    product,
    status_billing,
    status_delivery,
    status_order,
    technical,
    total_value,
  } = useSearch();

  const { orderOpen, overlapOrderOpen, newOrderOpen } = useOverlap();
  const { user, checkToken } = useAuth();

  useEffect(() => {
    if (
      user &&
      (!company || company.length <= 3) &&
      !selectedDate &&
      !selectedDeliveryDate &&
      !seller &&
      !product &&
      !status_billing &&
      !status_delivery &&
      !status_order &&
      !technical &&
      !total_value
    ) {
      checkToken();
      api.get<OrderDataType[]>('/orders').then((response) => {
        const sortedResponse = response.data.sort((a, b) => {
          if (a.created_at < b.created_at) return 1;
          if (a.created_at > b.created_at) return -1;
          return 0;
        });
        setSearchResults(sortedResponse);
      });
    } else if (
      user &&
      (company.length > 3 ||
        selectedDate ||
        selectedDeliveryDate ||
        seller ||
        product ||
        status_billing ||
        status_delivery ||
        status_order ||
        technical ||
        total_value.length > 1)
    ) {
      checkToken();
      api
        .get<OrderDataType[]>('/search-orders', {
          params: {
            created_at: selectedDate,
            company,
            // selectedDeliveryDate,
            seller,
            // product,
            status_billing,
            status_delivery,
            status_order,
            technical,
            total_value,
          },
        })
        .then((response) => {
          const sortedResponse = response.data.sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            if (a.created_at > b.created_at) return -1;
            return 0;
          });
          setSearchResults(sortedResponse);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    company,
    selectedDate,
    selectedDeliveryDate,
    seller,
    product,
    status_billing,
    status_delivery,
    status_order,
    technical,
    total_value,
    newOrderOpen,
  ]);

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
              <CompanyName>{search.client && search.client.name}</CompanyName>
              <Product>{productsToShow(search.id)}</Product>
              {(from === 'Comercial' || from === 'Billing') && (
                <>
                  <Professional>
                    {search.seller && search.seller.name}
                  </Professional>
                  <Value>
                    {search.orders_products && search.orders_products.length
                      ? 'R$'
                      : ''}
                    <div>{totalValue(search.id)}</div>
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
