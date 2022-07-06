import cloudinary from 'cloudinary';
import fileUpload from "express-fileupload";

export default class Cloudinary {
    private cloudinary: any;
    constructor() {
        this.cloudinary = cloudinary.v2;
    }
    public upload = async (image: fileUpload.FileArray | undefined, folder: string): Promise<any> => {
        if (!image) {
            return null;
        }
        const result = await this.cloudinary.uploader.upload(image[0],{
            folder: 'avatar',
        });
        return result;
    }

    public delete = async (public_id: string): Promise<any> => {
        const result = await this.cloudinary.uploader.destroy(public_id);
        return result;
    }

    public update = async (public_id: string, image: fileUpload.FileArray | undefined): Promise<any> => {
        if (!image) {
            return null;
        }
        const result = await this.cloudinary.uploader.upload(image[0],{
            folder: 'avatar',
            public_id: public_id,
        });
        return result;
    }

}