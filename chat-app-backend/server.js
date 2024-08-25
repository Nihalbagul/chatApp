const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api', apiRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('send_message', async ({ sender, receiver, content }) => {
        const Message = require('./models/Message');
        const message = new Message({ sender, receiver, content, timestamp: new Date() });
        await message.save();
        io.to(receiver).emit('receive_message', message);
    });

    socket.on('join', ({ name }) => {
        socket.join(name);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
