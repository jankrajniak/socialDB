import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
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
    console.log('Users seeded');

    try {
        await User.findOneAndUpdate(
            { username: 'testUser1' },
            { $addToSet: { friends: {
                $each: [userData[1]._id, userData[2]._id]
            }}},
            { new: true},
        );

        await User.findOneAndUpdate(
            { username: 'testUser2' },
            { $addToSet: { friends: userData[3]._id }},
            { new: true },
        );

        console.log('Friends added');
    } catch (error) {
        console.error('Error adding friends:', error);
        process.exit(1);
    }

} catch (error) {
    console.error('Error seeding user data:', error);
    process.exit(1);
};

try {
    const thoughts = [
        { thoughtText: "The One Ring is the ultimate symbol of power and corruption.", username: "testUser1" },
        { thoughtText: "Samwise Gamgee is the true hero of the story—his loyalty and perseverance are unmatched.", username: "testUser2" },
        { thoughtText: "The beauty of Rivendell shows how elves represent a connection between nature and wisdom.", username: "testUser3" },
        { thoughtText: "Gollum is one of the most tragic characters in literature—his downfall was inevitable but heartbreaking.", username: "testUser4" },
        { thoughtText: "The Battle of Helm's Deep is one of the best war sequences ever written.", username: "testUser1" },
        { thoughtText: "Sauron is terrifying because he never appears physically—his presence alone instills fear.", username: "testUser2" },
        { thoughtText: "The Shire represents the peace and simplicity that war always threatens to destroy.", username: "testUser3" },
        { thoughtText: "Boromir's fall and redemption arc is one of the most emotional moments in the trilogy.", username: "testUser4" },
        { thoughtText: "Aragorn is the perfect example of a reluctant hero who rises to his destiny.", username: "testUser1" },
        { thoughtText: "Mordor feels like a living nightmare—a wasteland shaped by evil itself.", username: "testUser2" },
        { thoughtText: "Legolas and Gimli's friendship proves that even deep-seated rivalries can be overcome.", username: "testUser3" },
        { thoughtText: "Frodo’s burden is not just the Ring, but the suffering he endures to save Middle-earth.", username: "testUser4" },
        { thoughtText: "Gandalf's line 'A wizard is never late' is an iconic moment of wisdom and humor.", username: "testUser1" },
        { thoughtText: "The Nazgûl are some of the scariest creatures in fantasy—their presence is pure dread.", username: "testUser2" },
        { thoughtText: "The Ents marching to war is an unforgettable moment—nature itself rising against industry.", username: "testUser3" },
        { thoughtText: "Eowyn’s 'I am no man' moment is one of the most satisfying scenes in any story.", username: "testUser4" },
        { thoughtText: "Bilbo's 'I'm going on an adventure!' moment is the perfect setup for a legendary journey.", username: "testUser1" },
        { thoughtText: "Saruman’s fall from wisdom to arrogance is a warning about the dangers of unchecked ambition.", username: "testUser2" },
        { thoughtText: "Tom Bombadil is one of the most mysterious characters in the lore—his true nature is still debated.", username: "testUser3" },
        { thoughtText: "The ending of *Return of the King* is bittersweet—Middle-earth is saved, but at great cost.", username: "testUser4" }
    ];

    for (const thought of thoughts) {
        try {
            const newThought = await Thought.create(thought);
            console.log('Thought created:', newThought._id);
            const updatedUser = await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: newThought._id}},
                { new: true },
            )
            console.log(updatedUser);

        } catch (error) {
            console.error('Error creating thought:', error);
            process.exit(1);
        }
    }; 

    console.log('Thoughts seeded');
    process.exit(0);
} catch (error) {
    console.error('Error seeding thought data:', error);
    process.exit(1);
};