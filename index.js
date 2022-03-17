const express = require('express')
const http = require('http')
const { Server } = require("socket.io")

const PORT = 5000
const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(PORT)


const users = []
const connections = []

io.on('connection', (socket) => {
  console.log('a user connected');
  connections.push(socket)

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log('a user disconnected');
  })

  socket.on('send message', data => {
    console.log('data: ', data);
    io.emit('add message', {...data})
  })
})