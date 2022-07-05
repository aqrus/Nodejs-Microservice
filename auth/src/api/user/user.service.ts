import { HttpException, messageException} from "../../common/exceptions";
import { isEmptyObject } from "../../common/utils";
import RegisterDto from "./dtos/registerUser.dto";
import IUser from "./user.interface";
import UserSchema from "./user.model";
import fileUpload from "express-fileupload";
import { Cloudinary, constant } from '../../common/utils';
export default class UserService {
    private UserSchema = UserSchema;
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
        const cloudinary = new Cloudinary();
        const imageResult = await cloudinary.upload(image, constant.folder.avatar);
        if(imageResult) {
            newUser.avatar.urlImage = imageResult.url;
            newUser.avatar.public_id = imageResult.public_id;   
        }
        return await newUser.save();
    }
}