import React, { createContext, useCallback, useContext, useState } from 'react';

interface SearchContextData {
  selectedDate: Date | null;
  selectedDeliveryDate: Date | null;
  companyName: string;
  service: string;
  seller: string;
  technical: string;
  value: string;
  status: string;
  searchDate(date: Date | null): void;
  searchDeliveryDate(date: Date | null): void;
  searchCompanyName(name: string): void;
  searchService(name: string): void;
  searchSeller(name: string): void;
  searchTechnical(name: string): void;
  searchValue(value: string): void;
  searchStatus(type: string): void;
}

interface ValueState {
  formattedValue: string;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider: React.FC = ({ children }) => {
  const [companyName, setCompanyName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | null>(
    null
  );
  const [service, setService] = useState('');
  const [seller, setSeller] = useState('');
  const [technical, setTechnical] = useState('');
  const [value, setValue] = useState<ValueState>({
    formattedValue: '',
  });
  const [status, setStatus] = useState('');

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

  const searchValue = useCallback((val: string): void => {
    setValue({
      formattedValue: val,
    });
  }, []);

  const searchStatus = useCallback((type: string): void => {
    setStatus(type);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        selectedDate,
        selectedDeliveryDate,
        companyName,
        service,
        seller,
        technical,
        status,
        value: value.formattedValue,
        searchDate,
        searchDeliveryDate,
        searchCompanyName,
        searchService,
        searchSeller,
        searchTechnical,
        searchValue,
        searchStatus,
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
