import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import RegisterDto from "./dtos/registerUser.dto";
import IUser from "./user.interface";
import UserSchema from "./user.model";
import fileUpload from "express-fileupload";
import { Cloudinary, constant } from '@sgticket-common/common';
export default class UserService {
    private UserSchema = UserSchema;
    private cloudinary = new Cloudinary();
    public register = async (model: RegisterDto, image: fileUpload.FileArray | undefined): Promise<IUser> => { 
        if (isEmptyObject(model)) {
            throw new HttpException(400,messageException.msg_001);
        }
        const user = await this.UserSchema.findOne({ email: model.email });
        if (user) {
            throw new HttpException(400,messageException.msg_002);
        }
        const newUser = new this.UserSchema(model);
        // cloudinary upload image
        const imageResult = await this.cloudinary.upload(image, constant.folder.avatar);
        if(imageResult) {
            newUser.avatar.urlImage = imageResult.url;
            newUser.avatar.public_id = imageResult.public_id;   
        }
        return await newUser.save();
    }
    
    public getCurrentUser = async (id: string): Promise<IUser> => {
        const user = await this.UserSchema.findById(id);
        if (!user) {
            throw new HttpException(409,messageException.msg_005);
        }
        return user;
    }

    public getAllUsers = async (): Promise<IUser[]> => {
        return await this.UserSchema.find({});
    }

    public getUserById = async (id: string): Promise<IUser> => {
        const user = await this.UserSchema.findById(id);
        if (!user) {
            throw new HttpException(404,messageException.msg_005);
        }
        return user;
    }

    public updateUser = async (id: string, model: RegisterDto, image: fileUpload.FileArray | undefined): Promise<IUser> => {
        const user = await this.UserSchema.findById(id);
        if (!user) {
            throw new HttpException(404,messageException.msg_005);
        }
        // cloudinary update image
        const imageResult = await this.cloudinary.update(user.avatar.public_id, image);
        if(imageResult) {
            user.avatar.urlImage = imageResult.url;
            user.avatar.public_id = imageResult.public_id;
        }
        user.firt_name = model.firt_name;
        user.last_name = model.last_name;
        user.email = model.email;
        user.password = model.password;
        return await user.save();
    }

    public deleteUser = async (id: string): Promise<IUser> => {
        const user = await this.UserSchema.findById(id);
        if (!user) {
            throw new HttpException(404,messageException.msg_005);
        }
        //cloudinary delete image
        
        const imageResult = await this.cloudinary.delete(user.avatar.public_id);
        if(imageResult) {
            user.avatar.urlImage = imageResult.url;
            user.avatar.public_id = imageResult.public_id;
        }
        return await user.remove();
    }
}