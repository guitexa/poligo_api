import express from 'express';

import routes from './routes';

const port = 4875;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`SERVER ON http://localhost:${port}`);
});
