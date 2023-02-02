//Controlador de Player
//Traemos modelos para hacer los querys
import { Player } from '../models/Player.js'

export const getPlayers = async (req, res) => {
    try {
        const players = await Player.findAll()
        res.send({players})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getPlayer = async (req, res) => {
    try {
        const id = req.params.id;
        const player = await Player.findOne({ 
            where: { id } 
        });

        if (!player) {
            return res.status(404).json({message: `No se encontro jugador con ID: ${id}`})
        }

        res.send(player)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const savePLayer = async (req, res) => {
    //Guradamos los datos que vienen del body
    const {id,name, years, position } = req.body
    try {
        const newPlayer = await Player.create({
            name,
            years,
            position
        });
        res.json(newPlayer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const updatePlayer = async (req, res) => {
    const id = req.params.id;
    const {name, priority, description} = req.body;
    try {
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({message: `No se encontro jugador con ID: ${id}`})
        }
        //En caso de que si cncontremos proyecto con esa id, lo modificamos
        player.name = name;
        player.priority = priority;
        player.description = description;

        //Lo actualizamos
        await player.save();

        res.send(player);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

//Eliminado fisico
export const deletePlayer = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        
        await Player.destroy({
            where: {id}
        });
    
        //Enviamos respuesta sin mostrar nada
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


//Login
export const loginPlayer = async (req, res) => {
    const {name} = req.body;
}

//Inhabilitamos un jugador
export const statePlayer = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        
        const player = await Player.findOne({
            where: {id}
        });
        if (!player) {
            return res.status(404).json({message: `No se encontro jugador con ID: ${id}`})
        }
        //En caso de que si exista jugador, le ponemos su estado en false
        player.state = !player.state;

        //Lo guardamos
        player.save();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};