import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Swagger UI imports
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

  // --- Swagger UI route: /api-docs ---
  // Prefer the bundled JSON (docs/swagger.json) produced by `npm run build-docs`.
  // If it's not available, fallback to docs/openapi.yaml.
  try {
    const projectDocsDir = path.join(process.cwd(), 'docs');
    const swaggerJsonPath = path.join(projectDocsDir, 'swagger.json');
    const openapiYamlPath = path.join(projectDocsDir, 'openapi.yaml');

    let swaggerDocument = null;

    if (fs.existsSync(swaggerJsonPath)) {
      // Use pre-bundled swagger.json (recommended for swagger-ui)
      const raw = fs.readFileSync(swaggerJsonPath, 'utf8');
      swaggerDocument = JSON.parse(raw);
      console.log('Loaded docs/swagger.json for Swagger UI');
    } else if (fs.existsSync(openapiYamlPath)) {
      // Fallback: parse openapi.yaml (may contain $ref to other files)
      const rawYaml = fs.readFileSync(openapiYamlPath, 'utf8');
      swaggerDocument = yaml.load(rawYaml);
      console.log('Loaded docs/openapi.yaml for Swagger UI (fallback)');
    } else {
      console.warn(
        'No API docs found (docs/swagger.json or docs/openapi.yaml)',
      );
    }

    if (swaggerDocument) {
      // Optional: swagger-ui options
      const swaggerOptions = {
   
      };
      app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, swaggerOptions),
      );
      console.log('Swagger UI available at /api-docs');
    }
  } catch (err) {
    console.warn('Cannot load OpenAPI doc for /api-docs:', err.message);
  }
  // --- end Swagger setup ---

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};
