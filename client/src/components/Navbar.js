import { useState } from 'react';

const Navbar = ({ vistaActual, onNavegar, cantidadEnCarrito }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const ir = (destino) => {
        onNavegar(destino);
        setMenuAbierto(false);
    };

    const marcarActual = (destino) => (vistaActual === destino ? 'page' : undefined);

    return (
        <header>
            <nav>
                <div className="brand-container">
                    <button className="brand-btn" type="button" onClick={() => ir('catalogo')}>
                        <img className="logo" src="/img/logo-hermanos-jota.jpg" alt="Hermanos Jota" />
                    </button>
                    <button className="title" type="button" onClick={() => ir('catalogo')}>
                        HERMANOS JOTA
                    </button>
                </div>

                <ul className={menuAbierto ? 'nav-links active' : 'nav-links'}>
                    <li>
                        <button type="button" onClick={() => ir('catalogo')} aria-current={marcarActual('catalogo')}>
                            Catálogo
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => ir('contacto')} aria-current={marcarActual('contacto')}>
                            Contacto
                        </button>
                    </li>
                </ul>

                <div className="nav-actions">
                    <p className="cart-link">
                        <span className="cart-text">Carrito</span>
                        <span className="cart-count">{cantidadEnCarrito}</span>
                    </p>
                    <button
                        className="menu-btn"
                        type="button"
                        aria-label="Abrir menú"
                        aria-expanded={menuAbierto}
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        &#9776;
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
