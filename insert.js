import { sequelize } from "./src/databases/databases.js";
import { Player } from "./src/models/Player.js";
import { Serie } from "./src/models/Serie.js";
import "./src/models/relation.js"

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
    }
]
  
  //Players
const players = [
    {
      name: "Sebastian Valenzuela",
      years: 21,
      position: "Delantero Izquierdo",
      partidos:6,
      goles:10,
      saves:0,
      image:""
    },
    {
      name: "Trinidad Viera",
      years: 15,
      position: "Delantero Centro",
      partidos:3,
      goles:5,
      saves:0,
      image:""
    },
    {
      name: "Agustin Viera",
      years: 13,
      position: "Defensor Central",
      partidos:10,
      goles:3,
      saves:0,
      image:""
    },
    {
      name: "Claudio Bravo",
      years: 30,
      position: "Portero",
      partidos:8,
      goles:0,
      saves:3,
      image:""
    }
];  

sequelize.sync({force: true}).then(() => {
    console.log("Conexion estanlecida");
})
.then(() => {
      players.forEach( player => Player.create(player));
  })
.then(() => {
    series.forEach( serie => Serie.create(serie));
})
.then( async () => {
    //Ejemplo de como se podrian ingresar datos a la BD
    //Creamos una nueva serie de ejemplo
    let seniorSerie = await Serie.create({
        name: "senior",
        coach: "Marcelo Bielsa",
        players: [
          {
            name: "Javier Viera",
            years: 37,
            position: "Medio Centro Ofensivo",
            partidos:3,
            goles:5,
            saves:0,
            image:""
          },
          {
            name: "Hernan Cifuentes",
            years: 40,
            position: "Delantero Centro",
            partidos:10,
            goles:6,
            saves:0,
            image:""
          }
        ]
    },{
      include: "players"
    });
})
.then( async () => {
  
    //OTRA FORMA DE CREAR O AGREGAR 

    let player1 = await Player.create({
      name: "Vicente Cuevas",
      years: 10,
      position: "Medio Centro",
      partidos:5,
      goles:2,
      saves:0,
      image:""
    });

    let player2 = await Player.create({
      name: "Pedro Ignacio",
      years: 11,
      position: "Portero",
      partidos:3,
      goles:0,
      saves:1,
      image:""
    });

    let segundaInfantil = await Serie.create({
      name: "segunda infantil",
      coach: "N/A"
    });
    segundaInfantil.addPlayer(player1);
    segundaInfantil.addPlayer(player2);
    //segundaInfantil.addPlayers([player1,player2]);
})