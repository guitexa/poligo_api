import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.use(ensureAuth);

contactsRouter.post('/', contactsController.create);
contactsRouter.get('/', contactsController.show);

export default contactsRouter;
