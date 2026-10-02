import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import { obtenerProductos } from './api';

const App = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [vista, setVista] = useState('catalogo');
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        let cancelado = false;

        obtenerProductos()
            .then((datos) => {
                if (!cancelado) setProductos(datos);
            })
            .catch((fallo) => {
                if (!cancelado) setError(fallo.message);
            })
            .finally(() => {
                if (!cancelado) setCargando(false);
            });

        return () => {
            cancelado = true;
        };
    }, []);

    const agregarAlCarrito = (producto) => {
        setCarrito((actual) => [...actual, producto]);
    };

    const verDetalle = (id) => {
        setIdSeleccionado(id);
        setVista('detalle');
        window.scrollTo(0, 0);
    };

    const navegar = (destino) => {
        setIdSeleccionado(null);
        setVista(destino);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Navbar vistaActual={vista} onNavegar={navegar} cantidadEnCarrito={carrito.length} />

            <main>
                {vista === 'catalogo' && (
                    <ProductList
                        productos={productos}
                        cargando={cargando}
                        error={error}
                        onVerDetalle={verDetalle}
                        onAgregarAlCarrito={agregarAlCarrito}
                    />
                )}

                {vista === 'detalle' && (
                    <ProductDetail
                        id={idSeleccionado}
                        onVolver={() => navegar('catalogo')}
                        onAgregarAlCarrito={agregarAlCarrito}
                    />
                )}

                {vista === 'contacto' && <ContactForm />}
            </main>

            <Footer />
        </>
    );
};

export default App;
