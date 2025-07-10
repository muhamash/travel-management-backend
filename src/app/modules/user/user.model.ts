import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";

// embedding schema 
const authProvider = new Schema<IAuthProvider>( {
    provider: { type: string, require: true },
    providerId : {type: string, require: true}
}, {
    versionKey: __dirname,
    _id: false
} );

const userSchema = new Schema<IUser>( {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values( Role ),
        default: Role.USER
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values( IsActive ),
        default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    auths: {
        type: [authProvider]
    },
}, {
    timestamps: true,
    versionKey: false
} );


export const User = model<IUser>("User", userSchema)