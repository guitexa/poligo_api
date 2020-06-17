import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Router />
  </BrowserRouter>
);

export default App;
