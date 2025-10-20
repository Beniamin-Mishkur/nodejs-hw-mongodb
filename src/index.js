// src/index.js
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();

    setupServer();
  } catch (error) {
    console.error(
      'Failed to start application due to an error:',
      error.message,
    );
    process.exit(1);
  }
};

bootstrap();
