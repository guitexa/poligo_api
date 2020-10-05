import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SearchProvider } from './search';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SearchProvider>
        <ToastProvider>{children}</ToastProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default AppProvider;
