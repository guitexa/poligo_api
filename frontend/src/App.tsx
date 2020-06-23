import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Router from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyles />
    <AppProvider>
      <Router />
    </AppProvider>
  </BrowserRouter>
);

export default App;
