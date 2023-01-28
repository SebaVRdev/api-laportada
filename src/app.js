//Configuracion de ecpress
import express from 'express';

//Importamos rutas de Players y Series 
import playersRoutes from './routes/players.routes.js'
import seriesRoutes from './routes/series.routes.js'
import teamsRoutes from './routes/teams.routes.js'

const app = express();

//Middleware para que reciba y envie JSON
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //('*') en vez de eso, cuando lanzemos la pag, se pone el url
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use(playersRoutes);
app.use(seriesRoutes);
app.use(teamsRoutes);

export default app;