import mongoose from "mongoose";
import IUser from './user.interface';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    avatar: {
        urlImage: String,
        public_id: String
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getJWToken = function (): string {
    return jwt.sign(
        { id: this._id }, 
        process.env.JWT_TOKEN_SECRET!, 
        { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN } );
}
export default mongoose.model<IUser & mongoose.Document>("user", UserSchema);
