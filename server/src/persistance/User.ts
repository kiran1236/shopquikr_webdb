import Mongoose from "mongoose";
import {IUser} from "../model/IUser";

/**
 * User schema with custom validations.
 */
const userSchema: Mongoose.Schema<IUser> = new Mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: "First name may only contain letters"
        }
    },

    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 2;
            },
            message: "Last name name must have more than two characters"
        }
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function (value: string): boolean {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: "Email id is not valid"
        }
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length === 60;
            },
            message: "Password hash is not valid"
        }
    }
});

/**
 * Prior to validation, check and see if there is an user already registered with that email id.
 * If so, promptly throw an error which will prevent the model from saving if this middleware is called.
 */

userSchema.pre<IUser>("validate", async function (next) {
    // Check if the email id is already present in the database
    const userAlreadyInDatabase = await User.findOne({
        email: {$eq: this.email}
    });
    if (userAlreadyInDatabase) {
        next(new Error("User already registered with that email"));
    }
    //this.username = this.email.split('@').slice(0, -1).join();
    next();
});

/**
 * username is just the email id with out the domain
 * for example email is kiran1236@gmail.com then kiran1236 is the username without the ending domain.
 */

userSchema
    .virtual("username")
    .get(function (this: IUser) {
        // Split and slice it so that ending element after @ is eliminated. This doesnt eliminate if there is a @ in the email id itself.
        return this.email
            .split("@")
            .slice(0, -1)
            .join();
    })
    .set(async function (this: IUser, username: string) {
        // Before setting a new username the email id also should be replaced, since email id and username should be unique so checking for it in db for its uniqueness.
        console.log("username : " + username);
        console.log("email : " + this.email);
        console.log(
            "computed new email : " + username + "@" + this.email.split("@").pop()
        );
        const userInDB = await User.findOne({
            email: {$eq: username + "@" + this.email.split("@").pop()}
        });
        console.log("userInDB : " + userInDB);
        if (userInDB) {
            console.log("In if block");
            throw new Error(
                "There is an email id with that username and domain as yours"
            );
        } else {
            console.log("In else block");
            this.email = username + "@" + this.email.split("@").pop();
        }
    });

/**
 * fullname is combination of firstname and lastname
 */

userSchema
    .virtual("fullName")
    .get(function (this: IUser) {
        // Assemble the full name from the first and last namesfullName
        return this.firstName + " " + this.lastName;
    })
    .set(function (this: IUser, fullName: string) {
        // For a simple example, the full name must separate the first name and last name with a hyphen
        // If the full name doesn't have a hyphen, throw an error
        if (!fullName.includes("-")) {
            // A proper full name for us would be 'Phillip-Fry'
            throw new Error(
                "Full name must have a hyphen between the first and last name"
            );
        }
        // Split should return two strings in an array, destructure assign them
        // Note: Logic here is brittle, if there are multiple dashes this will get thrown off
        const [firstName, lastName]: string[] = fullName.split("-");

        // Set the first name and last name based on pulling apart the full name
        this.firstName = firstName;
        this.lastName = lastName;
    });

// Export the compiled model
export const User = Mongoose.model<IUser>("user", userSchema);
