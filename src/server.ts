import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { handleErrors } from './middleware/handleErrors';
import { router } from './routes';
import swaggerFile from './swagger.json';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', exposedHeaders: ['X-Total-Count'] }));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(handleErrors);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log('✅ Server running on http://localhost:4000')
);
