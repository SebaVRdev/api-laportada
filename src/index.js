//Inicio de la aplicacion

//Llamamos la configuracion de express
import app from './app.js';

//Import bd
import {sequelize} from './databases/databases.js'

async function main(){
  try {
    //Sincronizamos con la BD y crea las tablas 
    await sequelize.sync({force: false});
    
    //Arrancamos servidor
    const PORT = 2000;
    app.listen(PORT)
    console.log(`Servidor escuchando: http://localhost:${PORT}`);
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
}

main();

//Solo importando esto ya hacemos que se creen las tablas pero solo se deben hacer cuando se utilicen esto es de prueba
/* import './models/Projects.js'
import './models/Task.js' */

// await sequelize.sync()  Trata de crear las tablas si no existen
// await sequelize.sync({force: true})  Trata de crear las tablas, eliminando las anteriores, las recrea
// await sequelize.sync({alter: true})  Trata de añadir cosas a la tabla

/* //PROBAR CONEXION EN EL TRY
await sequelize.authenticate();
  console.log('Connection has been established successfully.'); */