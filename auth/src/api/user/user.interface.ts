export default interface IUser {
    _id: string;
    first_name: string;
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
