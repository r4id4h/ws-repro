import { defineEventHandler } from 'h3';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
    target: 'ws://localhost:3001',
    ws: true,
    changeOrigin: true,
    secure: true,
});

proxy.on('error', (err, req, socket) => {
    console.error('Proxy-Fehler:', err);
    if (socket.writable) {
        socket.end('HTTP/1.1 502 Bad Gateway\r\n\r\n');
    }
});

export default defineEventHandler((event) => {
    const { req, res } = event.node;

    // WebSocket-Upgrade überprüfen
    if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
        console.log('WebSocket-Req:', req.url);
        proxy.ws(req, req.socket, event.node.rawHead || Buffer.alloc(0));
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});
