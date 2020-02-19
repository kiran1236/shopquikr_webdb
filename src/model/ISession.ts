import { Document } from 'mongoose';
import {IUser} from "./IUser";

export interface ISession extends Document {
    userId: IUser,
    sessionId: string,
    expireAt: Date
}