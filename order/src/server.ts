import 'dotenv/config';
import App from './app';
import { validateEnv } from '@sgticket-common/common';
import OrderRoute from './api/order/order.route';
validateEnv()

const routes = [
    new OrderRoute(),
];

const app = new App(routes);
app.listen();