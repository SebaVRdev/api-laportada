import { Router } from "express";
import { deleteSerie, getSerie, getSeries, saveSerie, updateSerie } from "../controllers/series.controller.js";

const router = Router();

//Definimos rutas
router.get('/serie',getSeries );
router.get('/serie/:id', getSerie);
router.post('/serie', saveSerie);
router.put('/serie/:id', updateSerie);
router.delete('/serie/:id', deleteSerie);

export default router;