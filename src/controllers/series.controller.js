//Controlador de las tareas
    
//Traemos modelos para hacer los querys
import { Serie } from '../models/Serie.js'

export const getSeries = async (req, res) => {
    try {
        const series = await Serie.findAll()
        res.send({series})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getSerie = async (req, res) => {
    try {
        const id = req.params.id;
        const serie = await Serie.findOne({ 
            where: { id } 
        });

        if (!serie) {
            return res.status(404).json({message: `No se encontro una tarea con ID: ${id}`})
        }

        res.json({serie})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//   REVISAAAAAAR!!!!
export const saveSerie = async (req, res) => {
    //Guradamos los datos que vienen del body
    const {name, coach} = req.body
    try {
        const newSerie = await Serie.create({
            name,
            coach
        });
        res.json(newSerie);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const updateSerie = async (req, res) => {
    const id = req.params.id;
    const datos = req.body;
    try {
        const serie = await Serie.findByPk(id);
        if (!serie) {
            return res.status(404).json({message: `No se encontro el proyecto con ID: ${id}`})
        }
        //En caso de que si cncontremos proyecto con esa id, lo modificamos
        serie.set(datos)
        //Lo actualizamos
        await serie.save();

        //Si hay un campo lo actualizo, si no existe lo añado 
        res.send(serie);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const deleteSerie = async (req, res) => {
    try {
        const id = req.params.id;
        
        await Serie.destroy({
            where: {id}
        });
    
        //Enviamos respuesta sin mostrar nada
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};