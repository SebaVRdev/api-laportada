//Controlador para la creacion y combinacion entre las series y jugadores
import { Player } from "../models/Player.js";
import { Serie } from "../models/Serie.js";
import { PlayerSerie } from "../models/Team.js";

//Obtener jugadores de una serie
export const getSeriesPlayer = async (req, res) => {
    const {id} = req.params //Id de la serie

    //Bucsamos los jugadores que tengan como serieId = id
    const players = await PlayerSerie.findAll({
        include: {
            model: Player,
            as: 'player',
            attributes: ['name']
        },
        where: {
            serieId: id
        }
    }); 

    res.json(players);
}

//Agregamos un player a una Serie
export const insertPlayerInSerie = async (req, res) => {
    const id = req.params.id;
    const { serie } = req.body;

    const player = await Player.findOne({ 
        where: { id } 
    });
    
    if (!player) {
        return res.status(404).json({message: `No se encontro jugadore con ID: ${id}`})
    }

    //Verificar que el usuario este valido para el club
    if (!player.state) {
        return res.status(404).json({message: `El jugador ${player.name} no esta valido!`});
    }
    const serieBD = await Serie.findOne({ 
        where: { 
            name: serie
         } 
    });

    if (!serieBD) {
        return res.status(404).json({message: `No se encontro serie con nombre: ${serie}`})
    }

    const team = await PlayerSerie.create({
        playerId: player.id,
        serieId: serieBD.id
    });
    res.send({team,serieBD});
};

//Sacar un usuario de una serie
export const deletePlayerOfSeries = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const serieId = req.params.serieId;
    
        //Con la combinacion del jugador con la serie podemos eliminarlo directamente
        await PlayerSerie.destroy({
            where: {
                playerId,
                serieId
            }
        });
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
};