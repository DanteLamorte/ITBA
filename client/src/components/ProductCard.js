import { formatearPrecio } from '../formato';

const ProductCard = ({ producto, onVerDetalle, onAgregarAlCarrito }) => (
    <article className="product-card">
        <button className="product-link" type="button" onClick={() => onVerDetalle(producto.id)}>
            <div className="product-media">
                <img src={`/${producto.imagen}`} alt={producto.alt} loading="lazy" />
            </div>
            <div className="product-body">
                <p className="product-category">{producto.categoria}</p>
                <h2 className="product-name">{producto.nombre}</h2>
                <p className="product-detail">{producto.descripcion}</p>
                <p className="product-price">{formatearPrecio(producto.precio)}</p>
            </div>
        </button>
        <button className="btn btn-add" type="button" onClick={() => onAgregarAlCarrito(producto)}>
            Añadir al carrito
        </button>
    </article>
);

export default ProductCard;
