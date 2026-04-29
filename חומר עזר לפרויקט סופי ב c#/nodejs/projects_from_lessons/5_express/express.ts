import express, { Request, Response } from 'express';
import Validators from './validators';

const HOST = "127.0.0.1";
const PORT = 3000;

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/name', (req: Request, res: Response) => {
    res.send('Ayala');
});

app.post('/api/teachers', (req: Request, res: Response) => {
    res.statusCode = 201;
    res.send("Ended successfully");
});

// /api/teachers/123456789
app.delete('/api/teachers/:id', (req: Request, res: Response) => {
    if (!Validators.validateId(req.params.id)) {
        res.statusCode = 401;
        res.send("Id is not valid");
    }

    const id: number = parseInt(req.params.id);
    res.send(`Teacher ${id} deleted successfully`);
});

app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}/`);
});