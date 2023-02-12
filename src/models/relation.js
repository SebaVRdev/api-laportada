import { Player } from "./Player.js"
import { Serie } from "./Serie.js"

//Relaciones Mu cho a Mucho
//NaN
//Un player Puede pertenecer a muchas Series
/* 
through: "player_serie"  <- Crea una nueva tabla en la BD 
Esta nueva tabla permitira hacer nuevas funciones
serie.addPlayer() serie.addPlayers([]) serie.getPlayer() ... etc
*/
Player.belongsToMany(Serie, {through: "player_serie",onDelete: 'CASCADE'}) 
Serie.belongsToMany(Player, {through: "player_serie",onDelete: 'CASCADE'}) 