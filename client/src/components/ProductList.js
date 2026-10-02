import { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ productos, cargando, error, onVerDetalle, onAgregarAlCarrito }) => {
    const [busqueda, setBusqueda] = useState('');

    const termino = busqueda.trim().toLowerCase();
    const encontrados = productos.filter((producto) =>
        `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLowerCase().includes(termino)
    );

    return (
        <>
            <section className="catalog-intro">
                <h1>Catálogo</h1>
                <p>
                    Cada pieza cuenta la historia de manos expertas y materiales nobles. Maderas nativas
                    certificadas, acabados de aceite de lino y cera de abejas, y una garantía de diez años
                    sobre la estructura.
                </p>
            </section>

            <section className="catalog-toolbar" aria-label="Buscar productos">
                <form className="search-form" role="search" onSubmit={(evento) => evento.preventDefault()}>
                    <label className="search-label" htmlFor="search-input">
                        Buscar en el catálogo
                    </label>
                    <input
                        className="search-input"
                        id="search-input"
                        type="search"
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                        placeholder="Mesa, butaca, biblioteca..."
                        autoComplete="off"
                        disabled={cargando || Boolean(error)}
                    />
                </form>
                {!cargando && !error && encontrados.length > 0 && (
                    <p className="catalog-count">
                        {encontrados.length === 1 ? '1 pieza disponible' : `${encontrados.length} piezas disponibles`}
                    </p>
                )}
            </section>

            {cargando && <p className="catalog-status">Cargando el catálogo...</p>}

            {error && (
                <p className="catalog-status catalog-status-error">
                    No pudimos cargar el catálogo: {error}
                </p>
            )}

            {!cargando && !error && (
                <section className="product-grid" aria-label="Productos">
                    {encontrados.map((producto) => (
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                            onVerDetalle={onVerDetalle}
                            onAgregarAlCarrito={onAgregarAlCarrito}
                        />
                    ))}
                </section>
            )}

            {!cargando && !error && encontrados.length === 0 && (
                <p className="catalog-status">No encontramos piezas con ese nombre. Probá con otra búsqueda.</p>
            )}
        </>
    );
};

export default ProductList;
