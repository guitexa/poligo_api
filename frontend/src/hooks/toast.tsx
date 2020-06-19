import React, { createContext, useContext, useState, useCallback } from 'react';

import MaterialToast from '../components/MaterialToast';

export interface ToastContextData {
  addToast(content: ToastContent): void;
  handleClose(): void;
}

export interface ToastContent {
  type: 'success' | 'info' | 'warning' | 'error';
  description: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toastContent, setToastContent] = useState<ToastContent>({
    type: 'info',
    description: '',
  });

  const addToast = useCallback(({ type, description }: ToastContent) => {
    setOpen(true);

    setToastContent({
      type,
      description,
    });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, handleClose }}>
      {children}
      <MaterialToast open={open} toastContent={toastContent} />
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be within ToastProvider');
  }

  return context;
}
