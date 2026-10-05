// Única fuente de verdad de la URL del backend.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const pedir = async (ruta) => {
    let respuesta;

    try {
        respuesta = await fetch(`${API_URL}${ruta}`);
    } catch {
        // fetch solo rechaza si la red falló: el backend está apagado o inalcanzable.
        throw new Error(`no pudimos contactar al servidor en ${API_URL}. Fijate que el backend esté corriendo.`);
    }

    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => ({}));
        throw new Error(detalle.error || `El servidor respondió ${respuesta.status}.`);
    }

    return respuesta.json();
};

export const obtenerProductos = () => pedir('/productos');

export const obtenerProductoPorId = (id) => pedir(`/productos/${id}`);
