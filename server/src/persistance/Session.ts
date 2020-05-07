import Mongoose from 'mongoose';
import {ISession} from "../model/ISession";
import * as mongoose from "mongoose";
import nanoid from 'nanoid';
import {User} from "./User";
import {IUser} from "../model/IUser";


/**
 * Session schema with custom validations.
 */

const sessionSchema: Mongoose.Schema<ISession> = new Mongoose.Schema<ISession>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            isAsync: true,
            validator: async (value: IUser) => {
                if (await User.findOne({_id: {$eq: value}}))
                    return true;
                else
                    return false;
            },
            message: 'User not in database'
        }
    },
    sessionId: {
        type: String,
        required: true,
        default: () => nanoid()
        /*
        validate: {
            validator: function (value: string): boolean {
                return value.length === 21;
            },
            message: 'session id not valid'
        }*/
    },
    expireAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: {expires: '5m'}
        /*
        validate: {
            validator: function (value: string): boolean {
                return value.length === 21;
            },
            message: 'session id not valid',
        }*/
    }
});


// Export the compiled model
export const Session = Mongoose.model<ISession>('session', sessionSchema);