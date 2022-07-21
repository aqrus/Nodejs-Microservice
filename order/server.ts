import 'dotenv/config';
import App from './app';
import { validateEnv } from '@sgticket-common/common';
import TicketRoute from './api/ticket/ticket.route';
validateEnv()

const routes = [
    new TicketRoute(),
];

const app = new App(routes);
app.listen();