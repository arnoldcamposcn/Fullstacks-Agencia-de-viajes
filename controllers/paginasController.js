

// import { where } from "sequelize";
import { Viaje } from "../models/Viaje.js";
import { Testimonios } from "../models/Testimoniosb.js";


const paginaInicio = async (req, res) => { 
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonios.findAll({ limit: 3 }));
    
    try {
        const resultado = await Promise.all(promiseDB); // Quita las llaves alrededor de promiseDB

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        }); 
    } catch (error) {
        console.log(error);
    }
}



const paginaNosotros =  (req, res) => { 
    res.render('nosotros',{
        pagina: 'Nosotros'
    }); // Renderiza la plantilla inicio.pug
}


const paginaViajes =  async (req, res) => { 

    const viajes = await Viaje.findAll();
    
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    });
}

    
const paginaTestimonios = async (req, res) => { 

    try{
        const testimonios = await Testimonios.findAll();
        
        res.render('testimonios',{
            pagina: 'Testimonios',
            testimonios
        }); 
    }catch (error){
        console.log(error);
    }
}


const paginaDetalleViaje = async (req, res) => { // Declaración de función asincrónica

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
};



export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
}