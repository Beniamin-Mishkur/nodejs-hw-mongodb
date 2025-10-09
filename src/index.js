import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

async function main() {
  await initMongoConnection();
  setupServer();
}

main().catch((err) => {
  console.error('Fatal error', err);
  process.exit(1);
});
