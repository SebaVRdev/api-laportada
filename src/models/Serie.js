//Modelar tabla de Task
import {DataTypes} from 'sequelize';

//Traemos conexion de la BD
import {sequelize}  from '../databases/databases.js'

//Definimos una tabla
export const Serie = sequelize.define('series', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    coach: {
        type: DataTypes.STRING,
        defaultValue: "N/A"
    },
},{
    //Aca pueden ir opciones de la tabla
    timestamps: false
});


