import { IRoute } from './common/interfaces';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cloudinary from 'cloudinary';
import expressFileUpload  from 'express-fileupload';
import { logger } from './common/utils';
import { errorMiddleware } from './common/middleware';
class App {
    public app: express.Application;
    public production: boolean;
    public port: string | number;

    constructor(routes: IRoute[]) {
        this.app = express();
        console.log(process.env.NODE_ENV);
        this.port = process.env.PORT || 3000;
        this.production = process.env.NODE_ENV === 'production';
        this.initializeCookie();
        this.connectToDatabase();
        this.initializeCloudinary();
        this.initializeUpdateFiles();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }

    private initializeRoutes(routes: IRoute[]): void {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeMiddleware(): void {
        if (this.production) {
            this.app.use(cors({
                origin: 'your.domain.com',
                credentials: true
            }));
        } else {
            this.app.use(cors({
                origin: true,
                credentials: true
            }));
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is listening on port ${this.port}`);
        })
    }
    //connect to db
    private connectToDatabase() {

        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            logger.info('Connection string is Invalid');
            return;
        }
        mongoose.connect(connectionString, ).catch((error: any) => {
            logger.error(error);
        })
        logger.info('connect success');
    }

    //apply cookie
    private initializeCookie() {
        this.app.set('trust proxy', true);
        this.app.use(cookieSession({
            signed: false,
            secure: true
        }));
    }

    //apply cloudynary
    private initializeCloudinary() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    //apply update files
    private initializeUpdateFiles() {
        this.app.use(expressFileUpload)
    }
}
export default App;