import {createServer, IncomingMessage, ServerResponse} from "node:http";

const HOST = "localhost";
const PORT = 5000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on: http://${HOST}:${PORT}`);
});

