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

    try {
        const friendsAdded1 = await User.findOneAndUpdate(
            { username: 'testUser1' },
            { $addToSet: { friends: {
                $each: [userData[1]._id, userData[2]._id]
            }}},
            { new: true},
        );

        const friendsAdded2 = await User.findOneAndUpdate(
            { username: 'testUser2' },
            { $addToSet: { friends: userData[3]._id }},
            { new: true },
        );

        console.log('Friends added', friendsAdded1, friendsAdded2);
    } catch (error) {
        console.error('Error adding friends:', error);
        process.exit(1);
    }
    process.exit(0);
} catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
};

