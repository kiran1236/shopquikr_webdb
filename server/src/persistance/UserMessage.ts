import Mongoose from 'mongoose';
import {IUserMessage} from "../model/IUserMessage";
import {IUser} from "../model/IUser";
import * as mongoose from "mongoose";
import {User} from "./User";

/**
 * Session schema with custom validations.
 */

const userMessageSchema: Mongoose.Schema<IUserMessage> = new Mongoose.Schema<IUserMessage>({
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
    message: {
        type: String,
        required: true,
    }
});


// Export the compiled model
export const UserMessage = Mongoose.model<IUserMessage>('usermessage', userMessageSchema);