import mongose from 'mongoose';

const db = async (): Promise<typeof mongose.connection> => {
    try {
        await mongose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB');
        console.log('Database connection established');
        return mongose.connection;
    } catch (error) {
        console.error('Database connection error: ', error);
        throw new Error('Database connection failed');
    }
}

export default db;