import express from 'express';
import { router } from './routes';
import dotenv from 'dotenv';
import { handleErrors } from './middleware/handleErrors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(handleErrors);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log('✅ Server running on http://localhost:4000')
);
