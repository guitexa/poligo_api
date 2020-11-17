import React, { createContext, useCallback, useContext, useState } from 'react';

interface SearchContextData {
  selectedDate: Date | null;
  selectedDeliveryDate: Date | null;
  company_name: string;
  service: string;
  seller: string;
  technical: string;
  total_value: string;
  status_order: string;
  status_delivery: string;
  status_billing: string;
  searchDate(date: Date | null): void;
  searchDeliveryDate(date: Date | null): void;
  searchCompanyName(name: string): void;
  searchService(name: string): void;
  searchSeller(name: string): void;
  searchTechnical(name: string): void;
  searchTotalValue(value: string): void;
  searchStatusOrder(type: string): void;
  searchStatusDelivery(type: string): void;
  searchStatusBilling(type: string): void;
  clearAllResults(): void;
}

interface TotalValueState {
  formattedValue: string;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider: React.FC = ({ children }) => {
  const [company_name, setCompanyName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | null>(
    null
  );
  const [service, setService] = useState('');
  const [seller, setSeller] = useState('');
  const [technical, setTechnical] = useState('');
  const [total_value, setTotalValue] = useState<TotalValueState>({
    formattedValue: '',
  });
  const [status_order, setStatusOrder] = useState('');
  const [status_delivery, setStatusDelivery] = useState('');
  const [status_billing, setStatusBilling] = useState('');

  const searchDate = useCallback((date: Date | null): void => {
    setSelectedDate(date);
  }, []);

  const searchDeliveryDate = useCallback((date: Date | null): void => {
    setSelectedDeliveryDate(date);
  }, []);

  const searchCompanyName = useCallback((name: string): void => {
    setCompanyName(name);
  }, []);

  const searchService = useCallback((name: string): void => {
    setService(name);
  }, []);

  const searchSeller = useCallback((name: string): void => {
    setSeller(name);
  }, []);

  const searchTechnical = useCallback((name: string): void => {
    setTechnical(name);
  }, []);

  const searchTotalValue = useCallback((val: string): void => {
    setTotalValue({
      formattedValue: val,
    });
  }, []);

  const searchStatusOrder = useCallback((type: string): void => {
    setStatusOrder(type);
  }, []);

  const searchStatusDelivery = useCallback((type: string): void => {
    setStatusDelivery(type);
  }, []);

  const searchStatusBilling = useCallback((type: string): void => {
    setStatusBilling(type);
  }, []);

  const clearAllResults = useCallback(() => {
    if (selectedDate) {
      searchDate(null);
    }

    if (selectedDeliveryDate) {
      searchDeliveryDate(null);
    }

    if (company_name) {
      searchCompanyName('');
    }

    if (service) {
      searchService('');
    }

    if (seller) {
      searchSeller('');
    }

    if (technical) {
      searchTechnical('');
    }

    if (total_value) {
      searchTotalValue('');
    }

    if (status_order) {
      searchStatusOrder('');
    }

    if (status_delivery) {
      searchStatusDelivery('');
    }

    if (status_billing) {
      searchStatusBilling('');
    }
  }, [
    company_name,
    searchCompanyName,
    searchDate,
    searchDeliveryDate,
    searchSeller,
    searchService,
    searchStatusBilling,
    searchStatusDelivery,
    searchStatusOrder,
    searchTechnical,
    searchTotalValue,
    selectedDate,
    selectedDeliveryDate,
    seller,
    service,
    status_billing,
    status_delivery,
    status_order,
    technical,
    total_value,
  ]);

  return (
    <SearchContext.Provider
      value={{
        selectedDate,
        selectedDeliveryDate,
        company_name,
        service,
        seller,
        technical,
        status_order,
        status_delivery,
        status_billing,
        total_value: total_value.formattedValue,
        searchDate,
        searchDeliveryDate,
        searchCompanyName,
        searchService,
        searchSeller,
        searchTechnical,
        searchTotalValue,
        searchStatusOrder,
        searchStatusDelivery,
        searchStatusBilling,
        clearAllResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch(): SearchContextData {
  const context = useContext(SearchContext);

  return context;
}
