import {Document} from 'mongoose';

export interface IMessage extends Document {
    message: string
}