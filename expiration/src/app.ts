import express from 'express';
import { logger, errorMiddleware, natsWrapper } from '@sgticket-common/common';
import OrderCreatedListener from './event/expiration.listener';
class App {
    public app: express.Application;
    public production: boolean;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.production = process.env.NODE_ENV === 'production';
        this.initializeNats();
        this.initializeErrorMiddleware()
    }

    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is listening on port ${this.port}`);
        })
    }


    //apply connect to nats
    private initializeNats() {
        natsWrapper.connect(process.env.NATS_CLUSTER_ID!, process.env.NATS_CLIENT_ID!, process.env.NATS_URL!);
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });

        new OrderCreatedListener(natsWrapper.client).listen();
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        
    }
}
export default App;