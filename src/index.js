// src/index.js
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();

    setupServer();
  } catch (error) {
    console.error(
      'Application startup failed because of an error::',
      error.message,
    );
    process.exit(1);
  }
};

bootstrap();
