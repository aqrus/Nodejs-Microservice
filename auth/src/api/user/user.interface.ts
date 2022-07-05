export default interface IUser {
    _id: string;
    firt_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: {
        urlImage: string;
        public_id: string;
    };
    getJWToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}
