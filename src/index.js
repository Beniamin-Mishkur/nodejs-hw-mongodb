// src/index.js
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();

    await createDirIfNotExists(TEMP_UPLOAD_DIR);

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
