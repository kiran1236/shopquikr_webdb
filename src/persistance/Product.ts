import Mongoose, {Schema} from 'mongoose';
import {IProduct} from "../model/IProduct";


/**
 * Product schema with custom validations.
 */
const productSchema: Mongoose.Schema<IProduct> = new Mongoose.Schema<IProduct>({

    productId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: async (value: String) => {
                if (await Product.findOne({productId:{$eq: value}}))
                    return false;
                else
                    return true;
            },
            message: 'Product already in database'
        }
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 0 && /^[a-zA-Z0-9]*$/.test(value);
            },
            message: 'Special characters not allowed in Product name'
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
export const Product = Mongoose.model<IProduct>('product', productSchema);