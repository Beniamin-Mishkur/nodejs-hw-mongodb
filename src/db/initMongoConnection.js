import mongoose from 'mongoose';

export async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
    console.error(
      'Missing MongoDB environment variables. Check .env or .env.example',
    );
    process.exit(1);
  }

  const uri = `mongodb+srv://${encodeURIComponent(
    MONGODB_USER,
  )}:${encodeURIComponent(
    MONGODB_PASSWORD,
  )}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Mongo connection error:', err);
    process.exit(1);
  }
}
