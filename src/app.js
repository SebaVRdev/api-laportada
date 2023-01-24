//Configuracion de ecpress
import express from 'express';

//Importamos rutas de Players y Series 
import playersRoutes from './routes/players.routes.js'
import seriesRoutes from './routes/series.routes.js'
import teamsRoutes from './routes/teams.routes.js'

const app = express();

//Middleware para que reciba y envie JSON
app.use(express.json());

//rutas
app.use(playersRoutes);
app.use(seriesRoutes);
app.use(teamsRoutes);

export default app;