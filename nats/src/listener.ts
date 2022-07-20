import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/tickets';
console.clear();
const stan = nats.connect('test-cluster', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');
    stan.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    });
    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('my-durable');
    const subcription = stan.subscribe('ticket:created',options);

    subcription.on('message', (msg: Message) => {
        const data = msg.getData();
        if(typeof data === 'string'){
            const sequence = msg.getSequence();
            const dataMsg = JSON.parse(data);
            console.log('Received event:', sequence, dataMsg);
        }
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
