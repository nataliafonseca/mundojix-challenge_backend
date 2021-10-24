import express from 'express';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log('✅ Server running on http://localhost:4000')
);
