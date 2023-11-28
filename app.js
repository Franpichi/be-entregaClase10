const express = require('express');
const exphbs = require('express-hbs');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.engine('hbs', exphbs.express4());
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

 
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

app.post('/crearProducto', (req, res) => {

  io.emit('actualizarProductos', { /* datos del producto actualizado */ });

  res.redirect('/realtimeproducts');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
