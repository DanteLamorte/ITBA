import { useState } from 'react';

const FORMULARIO_VACIO = { nombre: '', email: '', mensaje: '' };

const validar = ({ nombre, email, mensaje }) => {
    const errores = {};

    if (nombre.trim().length < 2) {
        errores.nombre = 'Escribí tu nombre, con dos letras alcanza.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errores.email = 'Revisá el email, no parece una dirección válida.';
    }

    if (mensaje.trim().length < 10) {
        errores.mensaje = 'Contanos un poco más, al menos diez caracteres.';
    }

    return errores;
};

const ContactForm = () => {
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    const actualizar = (evento) => {
        const { name, value } = evento.target;
        setFormulario((actual) => ({ ...actual, [name]: value }));
    };

    const limpiar = () => {
        setFormulario(FORMULARIO_VACIO);
        setErrores({});
        setEnviado(false);
    };

    const enviar = (evento) => {
        evento.preventDefault();

        const encontrados = validar(formulario);
        setErrores(encontrados);

        if (Object.keys(encontrados).length > 0) {
            setEnviado(false);
            return;
        }

        setFormulario(FORMULARIO_VACIO);
        setEnviado(true);
    };

    return (
        <section className="contact-section">
            <div className="section-header">
                <p className="eyebrow">Showroom y taller</p>
                <h1>Contacto</h1>
                <p className="lead">
                    Te acompañamos a elegir piezas nobles, pensadas para convivir con tu casa durante años.
                </p>
            </div>

            <div className="contact-layout">
                <article className="contact-panel" aria-labelledby="titulo-formulario">
                    <p className="eyebrow">Consultas</p>
                    <h2 id="titulo-formulario">Escribinos</h2>
                    <p className="lead">
                        Contanos qué ambiente querés renovar o qué pieza te interesa conocer.
                    </p>

                    {enviado && (
                        <p className="form-success" role="status">
                            Listo, recibimos tu mensaje. Te escribimos a la brevedad.
                        </p>
                    )}

                    <form className="contact-form" onSubmit={enviar} noValidate>
                        <div className="form-field">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                autoComplete="name"
                                placeholder="Tu nombre"
                                value={formulario.nombre}
                                onChange={actualizar}
                                aria-invalid={Boolean(errores.nombre)}
                            />
                            {errores.nombre && <span className="form-error">{errores.nombre}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="tu@email.com"
                                value={formulario.email}
                                onChange={actualizar}
                                aria-invalid={Boolean(errores.email)}
                            />
                            {errores.email && <span className="form-error">{errores.email}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                rows="6"
                                placeholder="Quiero consultar por..."
                                value={formulario.mensaje}
                                onChange={actualizar}
                                aria-describedby="mensaje-ayuda"
                                aria-invalid={Boolean(errores.mensaje)}
                            />
                            <span className="form-help" id="mensaje-ayuda">
                                Incluí medidas, madera preferida o el producto que viste en el catálogo.
                            </span>
                            {errores.mensaje && <span className="form-error">{errores.mensaje}</span>}
                        </div>

                        <div className="btn-row">
                            <button className="btn btn-primary" type="submit">
                                Enviar mensaje
                            </button>
                            <button className="btn" type="button" onClick={limpiar}>
                                Limpiar
                            </button>
                        </div>
                    </form>
                </article>

                <aside className="contact-aside" aria-labelledby="titulo-datos-contacto">
                    <div className="contact-image">
                        <img
                            src="/img/aparador-bruma.jpg"
                            alt="Aparador Bruma de Hermanos Jota en la Casa Taller"
                            loading="lazy"
                        />
                    </div>

                    <p className="eyebrow">Casa Taller</p>
                    <h2 id="titulo-datos-contacto">Hermanos Jota</h2>

                    <dl className="detail-specs">
                        <div className="spec-row">
                            <dt>Dirección</dt>
                            <dd>Av. San Juan 2847, San Cristóbal, CABA</dd>
                        </div>
                        <div className="spec-row">
                            <dt>Horarios</dt>
                            <dd>Lunes a viernes de 10:00 a 19:00. Sábados de 10:00 a 14:00.</dd>
                        </div>
                        <div className="spec-row">
                            <dt>Email</dt>
                            <dd>
                                <a className="email-contact" href="mailto:info@hermanosjota.com.ar">
                                    info@hermanosjota.com.ar
                                </a>
                            </dd>
                        </div>
                        <div className="spec-row">
                            <dt>WhatsApp</dt>
                            <dd>
                                <a className="email-contact" href="https://wa.me/541145678900">
                                    +54 11 4567-8900
                                </a>
                            </dd>
                        </div>
                        <div className="spec-row">
                            <dt>Instagram</dt>
                            <dd>
                                <a className="email-contact" href="https://www.instagram.com/hermanosjota_ba">
                                    @hermanosjota_ba
                                </a>
                            </dd>
                        </div>
                    </dl>

                    <div className="btn-row">
                        <a className="btn" href="mailto:ventas@hermanosjota.com.ar">
                            Ventas
                        </a>
                        <a className="btn" href="https://wa.me/541145678900">
                            WhatsApp
                        </a>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default ContactForm;
