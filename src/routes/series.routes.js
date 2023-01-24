import { Router } from "express";
import { deleteSerie, getSerie, getSeries, saveSerie, updateSerie } from "../controllers/series.controller.js";

const router = Router();

//Definimos rutas
router.get('/series',getSeries );
router.get('/series/:id', getSerie);
router.post('/series', saveSerie);
router.put('/series/:id', updateSerie);
router.delete('/series/:id', deleteSerie);

export default router;