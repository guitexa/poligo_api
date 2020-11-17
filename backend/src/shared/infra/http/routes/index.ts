import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsMailRouter from '@modules/users/infra/http/routes/sessions-mail.routes';
import sessionsPasswordRouter from '@modules/users/infra/http/routes/sessions-password.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import ordersProductsRouter from '@modules/orders/infra/http/routes/orders_products.routes';
import searchOrdersRouter from '@modules/orders/infra/http/routes/search_orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions-mail', sessionsMailRouter);
routes.use('/sessions-password', sessionsPasswordRouter);

routes.use('/clients', clientsRouter);

routes.use('/products', productsRouter);

routes.use('/orders', ordersRouter);

routes.use('/orders-products', ordersProductsRouter);

routes.use('/search-orders', searchOrdersRouter);

export default routes;
