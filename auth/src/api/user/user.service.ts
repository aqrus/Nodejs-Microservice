import { TokenData } from "../auth";
import { HttpException, messageException} from "../../common/exceptions";
import { isEmptyObject } from "../../common/utils";
import RegisterDto from "./dtos/registerUser.dto";
import UserSchema from "./user.model";
export default class UserService {
    private UserSchema = UserSchema;
    public register = async (model: RegisterDto): Promise<string> => { 
        if (isEmptyObject(model)) {
            throw new HttpException(400,messageException.msg_001);
        }
        const user = await this.UserSchema.findOne({ email: model.email });
        if (user) {
            throw new HttpException(400,messageException.msg_002);
        }
        const newUser = new this.UserSchema(model);
        await newUser.save();
        return newUser.getJWToken();
    }
}