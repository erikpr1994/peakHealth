import { MongoClient, Db } from 'mongodb';

let client: MongoClient | undefined;
let db: Db | undefined;

export async function connectToDatabase(): Promise<void> {
  // Check if already connected
  if (client && db) {
    try {
      // Test the existing connection
      await db.command({ ping: 1 });
      console.log('✅ MongoDB connection already established');
      return;
    } catch {
      console.log('⚠️ Existing connection failed, reconnecting...');
      // Close the failed connection before creating a new one
      await closeDatabase();
    }
  }

  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DATABASE;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!databaseName) {
    throw new Error('MONGODB_DATABASE environment variable is not set');
  }

  try {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    db = client.db(databaseName);

    // Test the connection
    await db.command({ ping: 1 });
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    // Clean up on failure
    client = undefined;
    db = undefined;
    throw error;
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export function getClient(): MongoClient {
  if (!client) {
    throw new Error(
      'MongoDB client not connected. Call connectToDatabase() first.'
    );
  }
  return client;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
    console.log('✅ MongoDB connection closed');
  }
}
