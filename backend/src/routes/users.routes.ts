import { Router } from 'express';

import CreateUserServices from '../services/CreateUserServices';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserServices();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
