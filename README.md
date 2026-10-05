# E-commerce Mueblería Hermanos Jota

Sitio de e-commerce para Hermanos Jota, una mueblería de Buenos Aires que trabaja con maderas
nativas certificadas y acabados naturales. El proyecto sigue el manual de marca: paleta de siena
tostado, verde salvia y alabastro cálido, tipografías Inter y Playfair Display.

## Integrantes

- (completar)

## Arquitectura

```
papu/
├── backend/            API REST con Node.js y Express
│   ├── data/           productos.js, el array de objetos que sirve la API
│   ├── middlewares/    logger y manejadores de 404 y de errores
│   ├── routes/         rutas modulares con express.Router
│   └── server.js       arma la app, monta middlewares y rutas, levanta el servidor
└── client/             aplicación de React (create-react-app)
    ├── public/img/     las fotos de las piezas y el logo
    └── src/
        ├── components/ Navbar, Footer, Home, ProductCard, ProductList, ProductDetail, ContactForm
        ├── api.js      las llamadas al backend, con la URL en un solo lugar
        ├── formato.js  el formateo de precios
        ├── App.js      estado del carrito, de la vista y la carga del catálogo
        └── styles.css  la hoja de estilos, compartida por todas las vistas
```

Los dos servidores corren por separado: el backend en el 3001 y el cliente en el 3000.

## Backend

### Instalación

```bash
cd backend
npm install
```

### Ejecución

```bash
npm start
```

Levanta la API en `http://localhost:3001`. Con `npm run dev` corre con `node --watch`, que reinicia
el servidor solo cuando cambia un archivo.

### Endpoints

| Método | Ruta                   | Respuesta                                              |
| ------ | ---------------------- | ------------------------------------------------------ |
| GET    | `/api/productos`       | `200` con el listado completo en JSON                   |
| GET    | `/api/productos/:id`   | `200` con el producto, o `404` si el id no existe       |
| (otra) | cualquier ruta         | `404` con un JSON que indica el método y la URL pedidos |

### Decisiones

- **Los datos viven en un array local** (`backend/data/productos.js`), sin base de datos. Es la única
  fuente de verdad del catálogo: el cliente no guarda copias. Cada pieza trae `destacado`, que marca
  las que aparecen en el inicio, y `detallesFabricacion` con materiales, medidas, terminación y
  garantía, que alimenta la página de detalle.
- **Rutas modulares con `express.Router`.** `server.js` solo monta el router en `/api/productos`, así
  que sumar un recurso nuevo no implica tocar el archivo principal.
- **Logging propio en lugar de una librería.** El middleware de `middlewares/logger.js` se engancha al
  evento `finish` de la respuesta, así registra el método, la URL, el código de estado y cuánto tardó,
  en vez de solo lo que entró.
- **Manejo de errores centralizado.** Ningún handler arma respuestas de error por su cuenta: todo pasa
  por `errorHandler`, que respeta el `status` del error si lo trae y cae en `500` si no.
- **CORS habilitado.** El cliente de React corre en otro puerto, así que el navegador bloquearía las
  peticiones sin esto.
- **`express.json()` montado aunque todavía no haya rutas POST**, para el formulario de contacto.

## Cliente

### Instalación

```bash
cd client
npm install
```

### Ejecución

```bash
npm start
```

Abre `http://localhost:3000`. El backend tiene que estar corriendo, si no el catálogo muestra un
mensaje de error con la URL que intentó contactar.

Para apuntar a otro backend se usa la variable `REACT_APP_API_URL` en `client/.env`.

### Decisiones

- **Navegación por renderizado condicional, sin router.** `App.js` guarda la vista actual en un
  `useState` y muestra `Home`, `ProductList`, `ProductDetail` o `ContactForm` según corresponda.
- **Una sola hoja de estilos para todo el sitio.** `styles.css` es la única fuente de estilos: las
  cuatro vistas comparten los mismos tokens de marca y los mismos componentes visuales. La tarjeta de
  producto de los destacados del inicio es exactamente la misma que la del catálogo.
- **Un solo botón.** `.btn` define la forma y la tipografía, y `.btn-primary` solo cambia el relleno.
  Ninguna sección redefine botones por su cuenta.
- **El carrito vive en `App.js`.** El contador baja a `Navbar` por props y la función de agregar baja
  hasta `ProductCard` y `ProductDetail`, así hay un solo lugar donde se guarda qué hay en el carrito.
- **Las llamadas al backend están en `api.js`.** Los componentes no escriben URLs ni arman `fetch` a
  mano. Si falla la red, el error dice a qué servidor no pudo llegar en vez de "Failed to fetch".
- **El listado y el detalle piden datos por separado.** El catálogo usa `GET /api/productos` y el
  detalle `GET /api/productos/:id`, cada uno con sus propios estados de carga y error.
- **Los `useEffect` se limpian con una bandera `cancelado`**, para no actualizar el estado de un
  componente que ya se desmontó.
- **Formulario de contacto controlado.** Un solo `useState` con los tres campos y una función `validar`
  aparte, que devuelve un objeto de errores por campo.
