import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtId: Schema.Types.ObjectId,
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[],
};

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,

};

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (this: Document, timeStamp: Date) {
                return timeStamp.toLocaleString('en-US') as unknown as Date;
            },
        },
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (this: Document, timeStamp: Date) {
                return timeStamp.toLocaleString('en-US') as unknown as Date;
            },
        },
        reactions: [reactionSchema],
    },
    { 
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: IThought) {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

export default Thought;

