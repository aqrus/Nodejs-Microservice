import { HttpException, messageException } from "@sgticket-common/common";
import { IUser, UserSchema } from "../user";

export default class authService {
    private UserSchema = UserSchema;
    public login = async (email: string, password: string): Promise<IUser> => {
        const user = await this.UserSchema.findOne({ email });
        if (!user) {
            throw new HttpException(400, messageException.msg_005);
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new HttpException(400, messageException.msg_003);
        }
        return user;
    }

}