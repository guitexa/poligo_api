import React, { createContext, useCallback, useContext, useState } from 'react';

interface OverlapContextData {
  orderOpen: boolean;
  newOrderOpen: boolean;
  newServiceOpen: boolean;
  productViewOpen: boolean;
  overlapOrderOpen(state: boolean): void;
  overlapNewOrderOpen(state: boolean): void;
  overlapNewServiceOpen(state: boolean): void;
  overlapProductViewOpen(state: boolean): void;
}

const OverlapContext = createContext<OverlapContextData>(
  {} as OverlapContextData
);

export const OverlapProvider: React.FC = ({ children }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [productViewOpen, setProductViewOpen] = useState(false);

  const overlapOrderOpen = useCallback(() => {
    setOrderOpen(!orderOpen);
  }, [orderOpen]);

  const overlapNewOrderOpen = useCallback(() => {
    setNewOrderOpen(!newOrderOpen);
  }, [newOrderOpen]);

  const overlapNewServiceOpen = useCallback(() => {
    setNewServiceOpen(!newServiceOpen);
  }, [newServiceOpen]);

  const overlapProductViewOpen = useCallback(() => {
    setProductViewOpen(!productViewOpen);
  }, [productViewOpen]);

  return (
    <OverlapContext.Provider
      value={{
        orderOpen,
        newOrderOpen,
        newServiceOpen,
        productViewOpen,
        overlapOrderOpen,
        overlapNewOrderOpen,
        overlapNewServiceOpen,
        overlapProductViewOpen,
      }}
    >
      {children}
    </OverlapContext.Provider>
  );
};

export function useOverlap(): OverlapContextData {
  const context = useContext(OverlapContext);

  return context;
}
