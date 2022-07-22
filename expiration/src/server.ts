import 'dotenv/config';
import App from './app';
import { validateEnv } from '@sgticket-common/common';
validateEnv()


const app = new App();
app.listen();