import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    userId: Schema.Types.ObjectId,
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const userSchema = new Schema<IUser>({
    userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(email: string) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    }
});

// Virtual property
userSchema
    .virtual('friendCount')
    // Which uses a getter 
    .get(function (this: IUser) {
        return this.friends.length;
    });

const User = model('User', userSchema);

export default User;