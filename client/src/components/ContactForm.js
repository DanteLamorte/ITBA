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
            <h1>Contacto</h1>
            <p className="contact-intro">
                Escribinos y te respondemos dentro de las 48 horas hábiles. También podés visitarnos en la
                Casa Taller de Av. San Juan 2847, de lunes a viernes de 10:00 a 19:00.
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
                        value={formulario.mensaje}
                        onChange={actualizar}
                        aria-invalid={Boolean(errores.mensaje)}
                    />
                    {errores.mensaje && <span className="form-error">{errores.mensaje}</span>}
                </div>

                <button className="btn" type="submit">
                    Enviar mensaje
                </button>
            </form>
        </section>
    );
};

export default ContactForm;
