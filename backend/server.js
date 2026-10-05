const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errors');
const productosRouter = require('./routes/productos.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// El cliente de React corre en otro puerto, así que necesita CORS habilitado.
app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/api/productos', productosRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`API de Hermanos Jota escuchando en http://localhost:${PORT}`);
});
