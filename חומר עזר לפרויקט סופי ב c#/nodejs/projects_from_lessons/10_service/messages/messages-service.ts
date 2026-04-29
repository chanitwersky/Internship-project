import { Message } from "./models";

import { v4 as uuidv4 } from 'uuid';

export default class MessagesService {
    private messages: Array<Message>;
    constructor() {
        this.messages = [];
    }

    public getAll(): Array<Message> {
        return this.messages;
    }

    public getById(id: string): Message|undefined {
        return this.messages.find(msg => msg.id == id);
    }

    public create(message: Message): string {
        const id = uuidv4(); 
        message.id = id;
        this.messages.push(message);
        return id;
    }
}