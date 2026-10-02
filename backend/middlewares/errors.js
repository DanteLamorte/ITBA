// Cae acá cualquier ruta que no matcheó con las anteriores.
const notFound = (req, res) => {
    res.status(404).json({
        error: `La ruta ${req.method} ${req.originalUrl} no existe en esta API.`
    });
};

// Manejador centralizado: todo error que se pase a next(error) termina acá.
// Los cuatro parámetros son obligatorios, así Express lo reconoce como manejador de errores.
const errorHandler = (error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500).json({
        error: error.message || 'Error interno del servidor.'
    });
};

module.exports = { notFound, errorHandler };
