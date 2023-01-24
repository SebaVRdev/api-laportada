import Sequelize from "sequelize"; //Sequelize es la biblioteca misma
//sequelize es una instancia

export const sequelize = new Sequelize("cdLaPortada", "postgres", "seba123", {
  host: "localhost",
  dialect: "postgres",
});
