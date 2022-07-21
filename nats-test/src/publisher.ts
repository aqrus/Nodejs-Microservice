import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/tickets';
console.clear();
const stan = nats.connect('test-cluster', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATSs');
    const publisher = new TicketCreatedPublisher(stan);
    const data = {
        id: '123',
        title: 'concert',
        price: 20,
        userId: '123',
    };
    try {
        await publisher.publish(data); 
    } catch (error) {
        console.log(error);
    }
});