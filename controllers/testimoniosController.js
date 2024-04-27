
import { Testimonios } from "../models/Testimoniosb.js"; // Importa correctamente Testimonios

const guardarTestimonio = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre está vacío' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo está vacío' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje está vacío' });
    }

    if (errores.length > 0) {
        // Consultar testimonios 
        const testimonios = await Testimonios.findAll();



        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        });
    } else {
        // Almacenarlo en la base de datos
        try {
            await Testimonios.create({ // Usa Testimonios en lugar de Testimonio
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimonios'); // Redirige a la página de inicio u otra página después de guardar el testimonio
        } catch (error) {
            console.log(error);
        }
    }
};

export { guardarTestimonio };
