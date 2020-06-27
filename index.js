const normalizePort = port => parseInt(port, 10);
const port = normalizePort(process.env.PORT || 8888);
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
const app = express();
const dev = app.get('env') !== 'production';
const helmet = require('helmet');
const router = require('./router');
const server = http.createServer(app);
const io = socketIo(server);
const { addUser, removeUser, getUser, getUsers } = require('./users');


if (!dev) {
    app.use(helmet.hidePoweredBy({ setTo: 'AmYou: selfmade with lots of Coffee ^^' }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.frameguard('deny'));
    app.use(helmet.featurePolicy({
        features: {
            fullscreen: ["'self'"],
            vibrate: ["'none'"],
            syncXhr: ["'none'"]
        }
    }));
    app.use(helmet.hsts({
        maxAge: 7776000,
        // 90 jours en sec
        includeSubdomains: true
    }));
}


app.use('/', express.static(path.join(__dirname, 'client/build/')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.use(router);
app.use(cors());

io.on('connection', (socket) => {

    socket.on('join',
        ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) {
                return callback(error);
            }

            socket.emit('message',
                { user: 'admin', text: `Bienvenue ${ user.name } dans ${ user.room }` });

            socket.broadcast.to(user.room).emit('message',
                { user: 'admin', text: `${ user.name } s'est connecté(e)` });

            socket.join( user.room );

            io.to(user.room).emit('roomData', { room: user.room, users: getUsers(user.room)});

            callback();
        });

    socket.on('sendMessage',
        (message, callback) => {
            const user = getUser( socket.id );

            io.to(user.room).emit('message',
                { user: user.name, text: message});
            io.to(user.room).emit('roomData',
                { room: user.room, users: getUsers(user.room)});

            callback();
        });

    socket.on('disconnect',
        () => {
            const user = removeUser(socket.id);

            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} just left.` });
            }
        });
});

server.listen(port,
    () => console.log(`Server listening on http://localhost:${port}`));
