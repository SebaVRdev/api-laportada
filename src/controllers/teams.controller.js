//Controlador para la creacion y combinacion entre las series y jugadores
import { Player } from "../models/Player.js";
import { Serie } from "../models/Serie.js";

//Obtener jugadores de una serie
export const getSeriesPlayer = async (req, res) => {
    const id = req.params.id //Id de la serie
    //Busamos ;a serie que le pertenezca ese id
    const serie = await Serie.findOne({
        where: {id}
    });

    const players = await serie.getPlayers();  // <== Esta funcion nos saca todos los players de la serie tomada
    res.json(players);
}

//Agregamos un player a una Serie
export const insertPlayerInSerie = async (req, res) => {
    const id = req.params.id; //Id del jugador
    const { serie } = req.body; //Serie: primera | segunda | senior | tercera | segunda infantil ...

    const player = await Player.findOne({ 
        where: { id } 
    });
    
    if (!player) {
        return res.status(404).json({message: `No se encontro jugadore con ID: ${id}`})
    }

    //Verificar que el usuario este activo. <== state: true
    if (!player.state) {
        return res.status(404).json({message: `El jugador ${player.name} no esta valido!`});
    };

    //Buscamos la serie por nombre
    const serieBD = await Serie.findOne({ 
        where: { 
            name: serie
         } 
    });

    if (!serieBD) {
        return res.status(404).json({message: `No se encontro serie con nombre: ${serie}`})
    }
    /*
        Ingresamos el jugador a la serie, esto automaticamente añade los id en player_serie   
    */
    const team = await serieBD.addPlayer(player);
    res.send({team});
};

//Sacar un usuario de una serie
export const deletePlayerOfSeries = async (req, res) => {
    try {
        //Tomamos los id: que vienen desde la url
        const playerId = req.params.playerId;
        const serieId = req.params.serieId;
        
        const serie = await Serie.findOne({ //<== Buscamos la serie que le pertenezca el id
            where: {
                id:serieId
            }
        });

        const remove = await serie.removePlayer(playerId) //<== Funcion automatica que elimina el jugador con el playerId de la serie buscada arriba
        console.log(remove); //elimina => remove = 1     no-elimina => remove = 0
        if (!remove) {
            return res.status(404).json({message: `No hubo eliminacion, el jugador con id:${playerId}, no debe pertenecer a la serie con id: ${serieId}`})
        }
        res.sendStatus(204);

    } catch (error) {
        console.log(error)
    }
};