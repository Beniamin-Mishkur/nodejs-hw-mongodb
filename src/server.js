import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contacts.js';

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pinoHttp());

  // Регістрація роутів
  app.use('/contacts', contactsRouter);

  // 404 handler для неіснуючих роутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Загальний error handler
  app.use((err, req, res, next) => {
    if (req && req.log && typeof req.log.error === 'function') {
      req.log.error(err);
    } else {
      console.error(err);
    }
    res.status(500).json({ message: 'Internal Server Error' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}
