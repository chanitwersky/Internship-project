import { Request, Response, Router } from 'express';
import MessagesService from './messages-service';
import { Message } from './models';
export default class MessagesRouter {
    public router: Router;

    constructor(private messagesService: MessagesService) {
        this.router = Router();
    }

    public init() {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(this.messagesService.getAll());
        });
        

        this.router.get('/:id', (req: Request, res: Response) => {
            const id = req.params.id;
            const msg = this.messagesService.getById(id);

            if (!msg) {
                res.status(404).send("Not found");
            }

            res.send(msg);
        });

        this.router.post('/', (req: Request, res: Response) => {
            const msg = req.body as Message;
            // VALIDATION

            const generatdId = this.messagesService.create(msg);
            res.status(201).send(generatdId);
        });

        this.router.put('/:id', (req: Request, res: Response) => {
            
        });

        this.router.delete('/:id', (req: Request, res: Response) => {
            
        });
    }
}