import { useEffect, useState } from 'react';
import { obtenerProductoPorId } from '../api';
import { formatearPrecio } from '../formato';

const ETIQUETAS = {
    materiales: 'Materiales y origen',
    medidas: 'Medidas',
    terminacion: 'Terminación y acabado',
    garantia: 'Garantía de taller'
};

const ProductDetail = ({ id, onVolver, onNavegar, onAgregarAlCarrito }) => {
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelado = false;

        setCargando(true);
        setError(null);

        obtenerProductoPorId(id)
            .then((datos) => {
                if (!cancelado) setProducto(datos);
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
    }, [id]);

    if (cargando) {
        return <p className="catalog-status">Cargando la pieza...</p>;
    }

    if (error) {
        return (
            <section className="detail-page">
                <p className="catalog-status catalog-status-error">{error}</p>
                <button className="btn" type="button" onClick={onVolver}>
                    Volver al catálogo
                </button>
            </section>
        );
    }

    const fabricacion = producto.detallesFabricacion || {};

    return (
        <section className="detail-page">
            <nav className="breadcrumb" aria-label="Miga de pan">
                <button className="breadcrumb-link" type="button" onClick={() => onNavegar('inicio')}>
                    Inicio
                </button>
                <span aria-hidden="true">/</span>
                <button className="breadcrumb-link" type="button" onClick={onVolver}>
                    Catálogo
                </button>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{producto.nombre}</span>
            </nav>

            <div className="detail-layout">
                <div className="detail-media">
                    <img src={`/${producto.imagen}`} alt={producto.alt} />
                </div>

                <div className="detail-body">
                    <p className="product-category">{producto.categoria}</p>
                    <h1 className="detail-name">{producto.nombre}</h1>
                    <p className="detail-price">{formatearPrecio(producto.precio)}</p>

                    <h2 className="detail-subtitle">Descripción</h2>
                    <p className="detail-description">{producto.descripcion}</p>

                    <h2 className="detail-subtitle">Detalles de fabricación y materiales</h2>
                    <dl className="detail-specs">
                        {Object.entries(ETIQUETAS).map(([clave, etiqueta]) => (
                            <div className="spec-row" key={clave}>
                                <dt>{etiqueta}</dt>
                                <dd>{fabricacion[clave]}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="btn-row">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => onAgregarAlCarrito(producto)}
                        >
                            Añadir al carrito
                        </button>
                        <button className="btn" type="button" onClick={() => onNavegar('contacto')}>
                            Consultar por encargo a medida
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
