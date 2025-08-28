import { MongoClient, Db } from 'mongodb';

let db: Db | null = null;
let client: MongoClient | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const mongoUri =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/peakhealth';

  try {
    client = new MongoClient(mongoUri);
    await client.connect();

    db = client.db();

    // eslint-disable-next-line no-console
    console.log('✅ Routines Service: Connected to MongoDB successfully');

    // Test the connection
    await db.admin().ping();
    // eslint-disable-next-line no-console
    console.log('✅ Routines Service: Database ping successful');

    return db;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Routines Service: Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    // eslint-disable-next-line no-console
    console.log('🔌 Routines Service: Disconnected from MongoDB');
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  // eslint-disable-next-line no-console
  console.log(
    '\n🛑 Routines Service: Received SIGINT, shutting down gracefully...'
  );
  await disconnectFromDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  // eslint-disable-next-line no-console
  console.log(
    '\n🛑 Routines Service: Received SIGTERM, shutting down gracefully...'
  );
  await disconnectFromDatabase();
  process.exit(0);
});
