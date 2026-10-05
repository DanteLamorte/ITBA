import ProductCard from './ProductCard';

const Home = ({ productos, cargando, error, onNavegar, onVerDetalle, onAgregarAlCarrito }) => {
    const destacados = productos.filter((producto) => producto.destacado).slice(0, 4);

    return (
        <>
            <section className="home-hero">
                <p className="eyebrow">Taller artesanal de diseño</p>
                <h1>Piezas pensadas para acompañar tus espacios</h1>
                <p className="lead">
                    Materiales nobles, oficio tradicional y una mirada contemporánea. Muebles concebidos
                    para durar generaciones.
                </p>
                <div className="btn-row">
                    <button className="btn btn-primary" type="button" onClick={() => onNavegar('catalogo')}>
                        Ver la colección
                    </button>
                    <button className="btn" type="button" onClick={() => onNavegar('contacto')}>
                        Visitar nuestro taller
                    </button>
                </div>
            </section>

            <section className="section-block" aria-labelledby="titulo-destacados">
                <div className="section-header">
                    <p className="eyebrow">Selección de taller</p>
                    <h2 id="titulo-destacados">Productos destacados</h2>
                    <p className="lead">
                        Una muestra de nuestras piezas más emblemáticas, trabajadas con encastres a mano y
                        acabados naturales.
                    </p>
                </div>

                {cargando && <p className="catalog-status">Cargando piezas destacadas...</p>}

                {error && (
                    <p className="catalog-status catalog-status-error">
                        No pudimos cargar los destacados: {error}
                    </p>
                )}

                {!cargando && !error && (
                    <section className="product-grid" aria-label="Piezas destacadas">
                        {destacados.map((producto) => (
                            <ProductCard
                                key={producto.id}
                                producto={producto}
                                onVerDetalle={onVerDetalle}
                                onAgregarAlCarrito={onAgregarAlCarrito}
                            />
                        ))}
                    </section>
                )}

                {!cargando && !error && (
                    <div className="btn-row btn-row-center">
                        <button className="btn" type="button" onClick={() => onNavegar('catalogo')}>
                            Ver catálogo completo ({productos.length} piezas) &rarr;
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default Home;
