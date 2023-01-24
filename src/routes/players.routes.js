import { Router } from "express";
import { deletePlayer, getPlayer, getPlayers, savePLayer, updatePlayer, statePlayer } from "../controllers/players.controller.js";

const router = Router();

//Definimos rutas
router.get('/players', getPlayers);
router.get('/players/:id', getPlayer);
router.post('/players', savePLayer);
router.put('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);
router.put('/players/disable/:id', statePlayer);

export default router;