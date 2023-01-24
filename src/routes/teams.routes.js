import { Router } from "express";
import { getSeriesPlayer,insertPlayerInSerie, deletePlayerOfSeries } from "../controllers/teams.controller.js";
const router = Router();

//Definimos rutas
//Ruta para obtener los jugadores de cada serie
             //serie => dame el que tenga id '' => de ese dame todos sus jugadores   
router.get('/series/:id/players', getSeriesPlayer);
router.post('/player-serie/:id',insertPlayerInSerie);
router.delete('/:playerId/:serieId',deletePlayerOfSeries);

export default router;