import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, beforeEach, afterAll } from '@jest/globals';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_TOKEN_SECRET = 'asdfasdf';
  process.env.JWT_TOKEN_EXPIRES_IN = '1h';
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
afterAll(async () => {
  await mongoose.connection.close();
});
