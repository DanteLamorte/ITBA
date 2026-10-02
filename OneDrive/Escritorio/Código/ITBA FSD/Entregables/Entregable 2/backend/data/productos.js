// Catálogo de Hermanos Jota.
// Fuente única de datos del backend: la API sirve este array.
const productos = [
    {
        id: 'mesa-ratona-nube',
        nombre: 'Mesa Ratona Nube',
        categoria: 'Living',
        descripcion: 'Base escultórica de nogal macizo y tapa de vidrio templado de 15 mm.',
        precio: 485000,
        imagen: 'img/mesa-ratona-nube.jpg',
        alt: 'Mesa ratona Nube con base de nogal y tapa de vidrio'
    },
    {
        id: 'mesa-comedor-aroma',
        nombre: 'Mesa Comedor Aroma',
        categoria: 'Comedor',
        descripcion: 'Tabla maciza de algarrobo para seis comensales, con patas en V.',
        precio: 1290000,
        imagen: 'img/mesa-comedor-aroma.jpg',
        alt: 'Mesa de comedor Aroma en madera de algarrobo'
    },
    {
        id: 'mesita-luz-vuelo',
        nombre: 'Mesita de Luz Vuelo',
        categoria: 'Dormitorio',
        descripcion: 'Módulo suspendido con cajón de tiro invisible y estante abierto.',
        precio: 340000,
        imagen: 'img/mesita-luz-vuelo.jpg',
        alt: 'Mesita de luz Vuelo suspendida con un cajón'
    },
    {
        id: 'silla-varilla',
        nombre: 'Silla Varilla',
        categoria: 'Comedor',
        descripcion: 'Respaldo de barrotes torneados y asiento tapizado en bouclé salvia.',
        precio: 265000,
        imagen: 'img/silla-varilla.jpg',
        alt: 'Silla Varilla con respaldo de barrotes y asiento verde salvia'
    },
    {
        id: 'silla-taller',
        nombre: 'Silla Taller',
        categoria: 'Oficina',
        descripcion: 'Estructura de nogal, respaldo de malla técnica y altura regulable.',
        precio: 520000,
        imagen: 'img/silla-taller.jpg',
        alt: 'Silla de trabajo Taller con respaldo de malla verde y ruedas'
    },
    {
        id: 'butaca-retiro',
        nombre: 'Butaca Retiro',
        categoria: 'Living',
        descripcion: 'Cuero curtido con taninos vegetales sobre bastidor de quebracho.',
        precio: 890000,
        imagen: 'img/butaca-retiro.jpg',
        alt: 'Butaca Retiro tapizada en cuero curtido color caramelo'
    },
    {
        id: 'sofa-salvia',
        nombre: 'Sofá Salvia',
        categoria: 'Living',
        descripcion: 'Tres cuerpos, relleno de espuma reciclada y base de nogal vista.',
        precio: 1750000,
        imagen: 'img/sofa-salvia.jpg',
        alt: 'Sofá Salvia de tres cuerpos con base de madera vista'
    },
    {
        id: 'aparador-bruma',
        nombre: 'Aparador Bruma',
        categoria: 'Comedor',
        descripcion: 'Puertas corredizas de ratán tejido a mano y tapa de mármol claro.',
        precio: 1120000,
        imagen: 'img/aparador-bruma.jpg',
        alt: 'Aparador Bruma con puerta de ratán y tapa de mármol'
    },
    {
        id: 'biblioteca-hilo',
        nombre: 'Biblioteca Hilo',
        categoria: 'Living',
        descripcion: 'Sistema modular de cinco estantes con herrajes de bronce macizo.',
        precio: 980000,
        imagen: 'img/biblioteca-hilo.jpg',
        alt: 'Biblioteca modular Hilo de cinco estantes con herrajes de bronce'
    },
    {
        id: 'butaca-aurora',
        nombre: 'Butaca Aurora',
        categoria: 'Dormitorio',
        descripcion: 'Terciopelo de algodón teñido con pigmentos naturales al agua.',
        precio: 760000,
        imagen: 'img/butaca-aurora.jpg',
        alt: 'Butaca Aurora tapizada en terciopelo rosa polvoriento'
    },
    {
        id: 'escritorio-oficio',
        nombre: 'Escritorio Oficio',
        categoria: 'Oficina',
        descripcion: 'Carpeta de cuero natural, dos cajones y organizador integrado.',
        precio: 1050000,
        imagen: 'img/escritorio-oficio.jpg',
        alt: 'Escritorio Oficio de nogal con carpeta de cuero y dos cajones'
    }
];

module.exports = productos;
