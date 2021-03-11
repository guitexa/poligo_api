import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsMailRouter from '@modules/users/infra/http/routes/sessions-mail.routes';
import sessionsPasswordRouter from '@modules/users/infra/http/routes/sessions-password.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import ordersProductsRouter from '@modules/orders_products/infra/http/routes/orders_products.routes';
import searchOrdersRouter from '@modules/orders/infra/http/routes/search_orders.routes';
import financialsRouter from '@modules/financials/infra/http/routes/financials.routes';

const routes = Router();

// Rota para criar e listar users
routes.use('/users', usersRouter);

// Rota da primeira autenticação do user apenas com e-mail
routes.use('/sessions-mail', sessionsMailRouter);

// Rota da segunda autenticação do user com e-mail e senha
routes.use('/sessions-password', sessionsPasswordRouter);

// Rota para criar e listar companies
routes.use('/companies', companiesRouter);

// Rota para criar e listar products
routes.use('/products', productsRouter);

// Rota para criar, listar e atualizar orders
routes.use('/orders', ordersRouter);

// Rota para listar, atualizar e deletar orders_products
routes.use('/orders-products', ordersProductsRouter);

// Rota para buscar informações dentro dos orders
routes.use('/search-orders', searchOrdersRouter);

// Rota para criar, listar e atualizar lançamentos financeiros
routes.use('/financials', financialsRouter);

export default routes;
