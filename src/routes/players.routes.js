import { Router } from "express";
import { deletePlayer, getPlayer, getPlayers, savePLayer, updatePlayer, statePlayer } from "../controllers/players.controller.js";

const router = Router();

//Definimos rutas
router.get('/player', getPlayers);
router.get('/player/:id', getPlayer);
router.post('/player', savePLayer);
router.put('/player/:id', updatePlayer);
router.delete('/player/:id', deletePlayer);
router.put('/player/disable/:id', statePlayer);

export default router;