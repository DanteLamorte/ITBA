import { useEffect, useState } from 'react';
import { obtenerProductoPorId } from '../api';
import { formatearPrecio } from '../formato';

const ProductDetail = ({ id, onVolver, onAgregarAlCarrito }) => {
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

    return (
        <section className="detail-page">
            <button className="back-btn" type="button" onClick={onVolver}>
                &larr; Volver al catálogo
            </button>

            <div className="detail-layout">
                <div className="detail-media">
                    <img src={`/${producto.imagen}`} alt={producto.alt} />
                </div>

                <div className="detail-body">
                    <p className="product-category">{producto.categoria}</p>
                    <h1 className="detail-name">{producto.nombre}</h1>
                    <p className="detail-description">{producto.descripcion}</p>
                    <p className="detail-price">{formatearPrecio(producto.precio)}</p>

                    <button className="btn btn-add" type="button" onClick={() => onAgregarAlCarrito(producto)}>
                        Añadir al carrito
                    </button>

                    <h2 className="detail-subtitle">Fabricación</h2>
                    <ul className="detail-specs">
                        <li>Madera certificada FSC de bosques responsables argentinos.</li>
                        <li>Acabado con aceite de lino prensado en frío y cera de abejas.</li>
                        <li>Adhesivos y tintes de bajo COV, base agua y pigmentos naturales.</li>
                        <li>Armado en la Casa Taller de San Cristóbal, Buenos Aires.</li>
                    </ul>

                    <h2 className="detail-subtitle">Garantía</h2>
                    <p className="detail-description">
                        Diez años sobre la estructura y cinco sobre los acabados. Incluye el programa Herencia
                        Viva: servicio de restauración, taller de cuidados y recompra de hasta el 40% del valor
                        en piezas bien cuidadas.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
