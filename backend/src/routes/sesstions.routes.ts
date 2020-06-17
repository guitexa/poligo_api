import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { name, password } = req.body;

  return res.json({ name, password });
});

export default sessionsRouter;
