import 'dotenv/config';
import App from './app';
import { validateEnv } from '@sgticket-common/common';
import AuthRoute from './api/auth/auth.route';
import UserRoute from './api/user/user.route';
validateEnv()

const routes = [
    new AuthRoute(),
    new UserRoute()
];

const app = new App(routes);
app.listen();