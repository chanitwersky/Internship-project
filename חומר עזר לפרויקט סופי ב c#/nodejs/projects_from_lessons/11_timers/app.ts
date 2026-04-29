import express, {Express} from 'express';
import MessagesRouter from './messages/messages-api';
import MessagesService from './messages/messages-service';

const HOST = "localhost";
const PORT = 5000;

export default class App {
    private app: Express;
    private messagesService: MessagesService;
    private messagesRouter: MessagesRouter;

    constructor() {

    }

    public init() {
        this.messagesService = new MessagesService();
        this.messagesRouter = new MessagesRouter(this.messagesService);

        this.messagesRouter.init();

        this.app = express();
        this.app.use(express.json()); // To support body!
        this.app.use('/api/messages', this.messagesRouter.router);

        this.app.listen(PORT, HOST, () => {
            console.log(`Listening on: http://${HOST}:${PORT}`);
        })
    }


}