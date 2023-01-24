import { sequelize } from "./src/databases/databases.js";
import { Player } from "./src/models/Player.js";
import { Serie } from "./src/models/Serie.js";
import { PlayerSerie } from "./src/models/Team.js";

//Series
const series = [
    {
      id: 1,
      name: "primera",
      coach: "Martin Hernandez"
    },
    {
      id: 2,
      name: "segunda",
      coach: "Victor Vega"
    },
    {
      id: 3,
      name: "tercera",
      coach: "Pep Guardiola"
    },
    {
      id: 4,
      name: "segunda infantil",
      coach: "N/A"
    }
]
  
  //Players
const players = [
    {
      id: 1,
      name: "Sebastian Valenzuela",
      years: 21,
      description: "Jugador rapido y veloz bueno pal futbol",
      state: true
    },
    {
      id: 2,
      name: "Javier Viera",
      years: 37,
      description: "Medio Centro ofensivo con pases increibles",
      state: true
    },
    {
      id: 3,
      name: "Trinidad Viera",
      years: 15,
      description: "Delantera centra goladora",
      state: true
    },
    {
      id: 4,
      name: "Agustin Viera",
      years: 12,
      description: "Defensor mas alto de todos, nunca pierde un cabezaso",
      state: true
    }
];  
  
//Teams
const teams = [
    {
      id: 1,
      playerId: 1,
      serieId: 1
    },
    {
      id: 2,
      playerId: 1,
      serieId: 3
    },
    {
      id: 3,
      playerId: 3,
      serieId: 4
    },
    {
      id: 4,
      playerId: 4,
      serieId: 4
    },
    {
      id: 5,
      playerId: 2,
      serieId: 2
    }
];

sequelize.sync({force: false}).then(() => {
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