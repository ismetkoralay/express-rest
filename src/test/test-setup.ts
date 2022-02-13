import { MongoMemoryServer } from 'mongodb-memory-server-global';
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async () => {
    process.env.NODE_ENV = "development";
    jest.setTimeout(1000 * 60 * 60);
    mongo = await MongoMemoryServer.create();

    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
}, 1000000);

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});