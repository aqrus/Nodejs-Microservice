import { natsWrapper } from '@sgticket-common/common';
import Queue from 'bull';
import { ExpirationCompletePublisher } from "../event";
interface Payload {
    orderId: string;
}
const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId
    });
});

export default expirationQueue;