import 'dotenv/config';
import App from './app';
import { validateEnv } from './common/utils';
import AuthRoute from './api/auth/auth.router';

validateEnv()

const routes = [
    new AuthRoute()
];

const app = new App(routes);
app.listen();