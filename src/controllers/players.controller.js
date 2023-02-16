//Controlador de Player
import fs from 'fs';
import path from 'path';

//Traemos modelos para hacer los querys
import { Player } from "../models/Player.js";

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.send({ players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findOne({
      where: { id },
    });

    if (!player) {
      return res
        .status(404)
        .json({ message: `No se encontro jugador con ID: ${id}` });
    }

    res.send(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayerForName = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name)
    const player = await Player.findOne({
      where: { name },
    });

    if (!player) {
      return res
        .status(404)
        .send({ message: `No se encontro jugador con nombre: ${name}` });
    }

    res.send(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePLayer = async (req, res) => {
  console.log("Entrando al SavePlayer!")
  //Guradamos los datos que vienen del body
  const { name, years, position, partidos, goles, saves } = req.body;
  try {
    const newPlayer = await Player.create({
      name,
      years,
      position,
      partidos,
      goles,
      saves,
    });
    res.json({player:newPlayer});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  const id = req.params.id;
  const { name, priority, description } = req.body;
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return res
        .status(404)
        .json({ message: `No se encontro jugador con ID: ${id}` });
    }
    //En caso de que si cncontremos proyecto con esa id, lo modificamos
    player.name = name;
    player.priority = priority;
    player.description = description;

    //Lo actualizamos
    await player.save();

    res.send(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Eliminado fisico
export const deletePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    await Player.destroy({
      where: { id },
    });

    //Enviamos respuesta sin mostrar nada
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login
export const loginPlayer = async (req, res) => {
  const { name } = req.body;
};

//Inhabilitamos un jugador
export const statePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const player = await Player.findOne({
      where: { id },
    });
    if (!player) {
      return res
        .status(404)
        .json({ message: `No se encontro jugador con ID: ${id}` });
    }
    //En caso de que si exista jugador, le ponemos su estado en false
    player.state = !player.state;

    //Lo guardamos
    player.save();

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  console.log("Entrando upload")
  //Recogemos id del jugador sobre el cual se va a guardar la imagen
  let id = req.params.id;
  let fileName = "Imagen no subida...";
  
  if (req.files.image) { //Siempre que se ingrese una file con name: 'image' entra
    var filePath = req.files.image.path; //Ubicacion del archivo
    let fileSplit = filePath.split("\\"); 
    fileName = fileSplit[2]; //Tomamos solo el nombre
    
    //Validamos que sea un archivo valido '.png' '.jpg' etc
    let extSplit = fileName.split("."); //Cortamos por el punto
    let fileExt = extSplit[1]; //Sacamos lo que venga despues del punto
    if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeng" || fileExt == "jpeg" || fileExt == "gif") {
      //SI ESTA BIEN ENTONCES EJECUTAMOS EL UPLOAD
      const player = await Player.findOne({
          where: { id },
      });  
      if (!player) {
          fs.unlink(filePath, (err) => {});
          return res.status(404).json({ message: `No se encontro jugador con ID: ${id}` });
      }
      //En caso de que si exista jugador, le insertamos el nombre de la imagen
      //Si con anterioridad ya tiene imagen debemos borrarla del .src/uploads
      if (player.image !== '') {
          fs.unlink(`src\\uploads\\${player.image}`,(err) => {});
      }
      player.image = fileName;
      //Lo guardamos
      player.save();
      res.status(200).send({message:'Imagen insertada con exito!' ,player});
    
    }else {
      //En caso de que el archivo no este bien, lo borramos de la carpeta upload
      fs.unlink(filePath, (err) => {
          return res.status(200).send({ message: "Extencion no valida" });
      });
    }
  }
};

//Metodo para devolver la imagen
export const getImageFile = (req, res) => {
  let file = req.params.image; //Recogemos el nombre del archivo que lo recibe desde la Url
  let path_file = "./src/uploads/" + file; //Obtenemos el path completo de la imagen

  //Verificamos de que exista el path
  fs.exists(path_file, (exixsts) => {
      console.log(path_file)
    if (exixsts) {
        console.log("Si existe")
      return res.sendFile(path.resolve(path_file));
    } else {
      return res.status(200).send({
        message: "No existe la imagen",
      });
    }
  });
};
