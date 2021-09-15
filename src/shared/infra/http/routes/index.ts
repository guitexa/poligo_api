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
import bankAccountsRouter from '@modules/bank_accounts/infra/http/routes/bank_accounts.routes';
import paymentMethodsRouter from '@modules/payment_methods/infra/http/routes/payment_methods.routes';
import searchFinancialsRouter from '@modules/financials/infra/http/routes/search_financials.routes';
import splitsPaymentWayRouter from '@modules/splits_payment_way/infra/http/routes/splits_payment_way.routes';

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

// Rota para criar, listar e atualizar contas bancárias
routes.use('/bank-accounts', bankAccountsRouter);

// Rota para criar, listar e atualizar contas bancárias
routes.use('/payment-methods', paymentMethodsRouter);

// Rota para buscar informações dentro dos lançamentos financeiros
routes.use('/search-financials', searchFinancialsRouter);

// Rota para buscar parcelas
routes.use('/splits-payment-way', splitsPaymentWayRouter);

export default routes;
