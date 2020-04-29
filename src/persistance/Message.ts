import Mongoose from 'mongoose';
import {IMessage} from "../model/IMessage";

/**
 * Session schema with custom validations.
 */

const messageSchema: Mongoose.Schema<IMessage> = new Mongoose.Schema<IMessage>({
    message: {
        type: String,
        required: true,
    }
});


// Export the compiled model
export const Message = Mongoose.model<IMessage>('message', messageSchema);