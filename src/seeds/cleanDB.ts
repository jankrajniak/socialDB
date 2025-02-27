import { User, Thought } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        console.log('Users collection cleaned');
    
        await Thought.deleteMany({});
        console.log('Thoughts collection cleaned');


    } catch (error) {
        console.error('Error cleaning collections:', error);
        process.exit(1);
    }
};

export default cleanDB;