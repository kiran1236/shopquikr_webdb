import {Document} from 'mongoose';
import { IUser } from './IUser';

export interface IUserMessage extends Document {
    userId: IUser,
    message: string
}