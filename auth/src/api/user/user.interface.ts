import paginate from 'mongoose-paginate-v2';

export default interface IUser {
    _id: string;
    firt_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    avatar: {
        urlImage: string;
        public_id: string;
    };
    getJWToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}
