const express = require('express');
const productos = require('../data/productos');

const router = express.Router();

// GET /api/productos -> listado completo
router.get('/', (req, res) => {
    res.json(productos);
});

// GET /api/productos/:id -> una pieza, o 404 si el id no existe
router.get('/:id', (req, res) => {
    const producto = productos.find((item) => item.id === req.params.id);

    if (!producto) {
        return res.status(404).json({
            error: `No existe un producto con el id "${req.params.id}".`
        });
    }

    res.json(producto);
});

module.exports = router;
