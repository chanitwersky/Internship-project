import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const HOST = "127.0.0.1"; // localhost
const PORT = 5000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    console.log(`[${method}] Request to: ${url}`);

    if (method == "GET" && url == "/api/students") {
        res.end(JSON.stringify(["Student 1", "Student 2"]));
    } else if (method == "GET" && url == "/api/teachers") {
        res.end(JSON.stringify(["Teacher 1", "Teacher 2"]));
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on: http://${HOST}:${PORT}`);
});