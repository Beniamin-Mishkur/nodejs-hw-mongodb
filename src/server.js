import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Допоміжні імпорти для Swagger UI
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome back, User! The server is running smoothly.',
    });
  });

  // Swagger UI route: /api-docs
  try {
    const openapiPath = path.join(process.cwd(), 'docs', 'openapi.yaml');
    if (fs.existsSync(openapiPath)) {
      const openapiYaml = fs.readFileSync(openapiPath, 'utf8');
      const openapiDocument = yaml.load(openapiYaml);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
      console.log('Swagger UI available at /api-docs');
    } else {
      console.warn(
        `OpenAPI file not found at ${openapiPath}. /api-docs will be unavailable.`,
      );
    }
  } catch (err) {
    console.warn('Cannot load OpenAPI doc for /api-docs:', err.message);
  }

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};
