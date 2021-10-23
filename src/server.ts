import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(4000, () =>
  console.log('✅ Server running on http://localhost:4000')
);
