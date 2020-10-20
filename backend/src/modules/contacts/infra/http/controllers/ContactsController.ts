import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactService from '@modules/contacts/services/CreateContactService';
import ListContactsService from '@modules/contacts/services/ListContactsService';

export default class ContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, phone } = req.body;

    const createContact = container.resolve(CreateContactService);

    const contact = await createContact.execute({
      name,
      email,
      phone,
    });

    return res.json(contact);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listContacts = container.resolve(ListContactsService);

    const contacts = await listContacts.execute();

    return res.json(contacts);
  }
}
