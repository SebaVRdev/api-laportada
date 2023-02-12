//Modelar tabla de Task
import {DataTypes} from 'sequelize';

//Traemos conexion de la BD
import {sequelize}  from '../databases/databases.js'

//Traemos el player para la relacion
import { Player } from './Player.js';
import { Serie } from './Serie.js';

//Definimos una tabla
export const PlayerSerie = sequelize.define('teams', {
    
},{
    //Aca pueden ir opciones de la tabla
    timestamps: false
});

/* 
Player.hasMany(PlayerSerie, {
    as: 'player',
    foreignKey: 'playerId'
});

Serie.hasMany(PlayerSerie, {
    as: 'serie',
    foreignKey: 'serieId',
});

PlayerSerie.belongsTo(Player, {
    as: 'player'
});
PlayerSerie.belongsTo(Serie, {
    as: 'serie'
});
 */