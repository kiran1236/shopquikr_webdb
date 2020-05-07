import {Document} from 'mongoose';
import {IUser} from "./IUser";
import {IProduct} from "./IProduct";

export interface IOrder extends Document {
    orderId: string,
    userId: IUser,
    productId: IProduct,
    price: string,
    quantity: string
}