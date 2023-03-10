//Modelar tabla de Projects
import {DataTypes} from 'sequelize';

//Traemos conexion de la BD
import {sequelize}  from '../databases/databases.js'

//Definimos una tabla
export const Player = sequelize.define('players', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    years: {
        type: DataTypes.INTEGER
    },
    position: {
        type: DataTypes.STRING
    },
    partidos:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    goles:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    saves:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    image:{
        type: DataTypes.STRING,
    }
},{
    //Aca pueden ir opciones de la tabla
    timestamps: false
});