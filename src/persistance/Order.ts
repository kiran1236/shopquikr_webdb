import Mongoose from 'mongoose';
import {IOrder} from "../model/IOrder";
import * as mongoose from "mongoose";
import {User} from "./User";
import {IUser} from "../model/IUser";
import {Product} from "./Product";
import {IProduct} from "../model/IProduct";


/**
 * Session schema with custom validations.
 */

const orderSchema: Mongoose.Schema<IOrder> = new Mongoose.Schema<IOrder>({
    orderId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: async (value: String) => {
                if (await Order.findOne({orderId: {$eq: value}}))
                    return false;
                else
                    return true;
            },
            message: 'Order already in database'
        }
    },
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

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        validate: {
            isAsync: true,
            validator: async (value: IProduct) => {
                if (await Product.findOne({_id: {$eq: value}}))
                    return true;
                else
                    return false;
            },
            message: 'Product not in database'
        }
    },
    price: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 0 && /^[0-9]*$/.test(value);
            },
            message: 'Price may only contain numbers'
        }
    },
    quantity: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 0 && /^[0-9]*$/.test(value);
            },
            message: 'Quantity may only contain numbers'
        }
    }
});


// Export the compiled model
export const Order = Mongoose.model<IOrder>('order', orderSchema);