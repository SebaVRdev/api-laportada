import { sequelize } from "./src/databases/databases.js";
import { Player } from "./src/models/Player.js";
import { Serie } from "./src/models/Serie.js";
import { PlayerSerie } from "./src/models/Team.js";

//Series
const series = [
    {
      name: "primera",
      coach: "Martin Hernandez"
    },
    {
      name: "segunda",
      coach: "Victor Vega"
    },
    {
      name: "tercera",
      coach: "Pep Guardiola"
    },
    {
      name: "segunda infantil",
      coach: "N/A"
    }
]
  
  //Players
const players = [
    {
      name: "Sebastian Valenzuela",
      years: 21,
      position: "Delantero Izquierdo",
      state: true
    },
    {
      name: "Javier Viera",
      years: 37,
      position: "Medio Centro Ofensivo",
      state: true
    },
    {
      name: "Trinidad Viera",
      years: 15,
      position: "Delantero Centro",
      state: true
    },
    {
      name: "Agustin Viera",
      years: 12,
      position: "Defensor Central",
      state: true
    }
];  
  
//Teams
const teams = [
    {
      playerId: 1,
      serieId: 1
    },
    {
      playerId: 1,
      serieId: 3
    },
    {
      playerId: 3,
      serieId: 4
    },
    {
      playerId: 4,
      serieId: 4
    },
    {
      playerId: 2,
      serieId: 2
    }
];

sequelize.sync({force: true}).then(() => {
    console.log("Conexion estanlecida");
})
.then(() => {
    series.forEach( serie => Serie.create(serie));
})
.then(() => {
    players.forEach( player => Player.create(player));
})
.then(() => {
    teams.forEach( team => PlayerSerie.create(team));
})