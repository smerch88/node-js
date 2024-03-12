import http from 'http';
import net from 'net';

const logCache = [];

const handleLog = (data) => {
    logCache.push(data.toString());
};

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        handleLog(data);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.error('Error:', error);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const httpServer = http.createServer((req, res) => {
    if (req.url === '/logs' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(logCache));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT_HTTP = 3001;
httpServer.listen(PORT_HTTP, () => {
    console.log(`HTTP Server listening on port ${PORT_HTTP}`);
});
