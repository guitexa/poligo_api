import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from './hooks/toast';
import Router from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyles />
    <ToastProvider>
      <Router />
    </ToastProvider>
  </BrowserRouter>
);

export default App;
