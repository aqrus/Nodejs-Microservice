import { Message, Stan } from "node-nats-streaming";
import Subjects from "./subject.nats";

interface Event {
    subject: Subjects;
    data: any;
}
export default abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    private client: Stan;
    private ackWait: number = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
                    .subscriptionOptions()
                    .setManualAckMode(true)
                    .setAckWait(this.ackWait)
                    .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg: Message) => {
            console.log('Message received');
            const data = this.parseMessage(msg);
            this.onMessage(data, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
}
