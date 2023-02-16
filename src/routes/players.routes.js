import { Router } from "express";
import multiparty from 'connect-multiparty';

import { deletePlayer, getPlayer, getPlayers, savePLayer, updatePlayer, statePlayer, uploadImage, getImageFile, getPlayerForName } from "../controllers/players.controller.js";
import { verifyName } from "../middlewares/auth.js";

let multipartMiddleware = multiparty({uploadDir: './src/uploads'}); //Indicamos donde se van a guardar las imagenes que subamos

const router = Router();

//Definimos rutas
router.get('/player', getPlayers);
router.get('/player/:id', getPlayer);
router.get('/player-name/:name', getPlayerForName);
router.post('/player',verifyName ,savePLayer);
router.put('/player/:id', updatePlayer);
router.delete('/player/:id', deletePlayer);
router.put('/player/disable/:id', statePlayer);

//Subidas archivos
router.post('/player/upload-img/:id', multipartMiddleware,uploadImage);
router.get('/get-image/:image', getImageFile);

export default router;