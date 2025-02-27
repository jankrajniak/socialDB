import db from '../config/connection.js';
import { User } from '../models/index.js';
import cleanDB from './cleanDB.js';

try {
    await db();
    await cleanDB();

    const users = [
        { 
            username: 'testUser1',
            email: 'testUser1@gmail.com',
        },
        { 
            username: 'testUser2',
            email: 'testUser2@gmail.com',
        },
        {
            username: 'testUser3',
            email: 'testUser3@gmail.com',
        },
        {
            username: 'testUser4',
            email: 'testUser4@gmail.com'
        }
    ]

    const userData = await User.create(users);
    console.log('Users seeded', userData);

    // const getRandomFriends = (userId: String, userList: any[]) => {
    //     const filteredUsers = userList.filter(user => user._id !== userId);
    //     const shuffled = filteredUsers.sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0,2).map(user => user._id);
    // }

} catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
};

