import React, { createContext, useCallback, useContext, useState } from 'react';

interface OverlapContextData {
  orderOpen: boolean;
  newOrderOpen: boolean;
  newProductOpen: boolean;
  productViewOpen: boolean;
  overlapOrderOpen(state: boolean): void;
  overlapNewOrderOpen(state: boolean): void;
  overlapNewProductOpen(state: boolean): void;
  overlapProductViewOpen(state: boolean): void;
}

const OverlapContext = createContext<OverlapContextData>(
  {} as OverlapContextData
);

export const OverlapProvider: React.FC = ({ children }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [productViewOpen, setProductViewOpen] = useState(false);

  const overlapOrderOpen = useCallback(() => {
    setOrderOpen(!orderOpen);
  }, [orderOpen]);

  const overlapNewOrderOpen = useCallback(() => {
    setNewOrderOpen(!newOrderOpen);
  }, [newOrderOpen]);

  const overlapNewProductOpen = useCallback(() => {
    setNewProductOpen(!newProductOpen);
  }, [newProductOpen]);

  const overlapProductViewOpen = useCallback(() => {
    setProductViewOpen(!productViewOpen);
  }, [productViewOpen]);

  return (
    <OverlapContext.Provider
      value={{
        orderOpen,
        newOrderOpen,
        newProductOpen,
        productViewOpen,
        overlapOrderOpen,
        overlapNewOrderOpen,
        overlapNewProductOpen,
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
