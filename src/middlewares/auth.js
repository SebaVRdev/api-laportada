//MDLW para verificar que al ingresar nuevos usuarios sean unos que no existan
import { Player } from "../models/Player.js";

export const verifyName = async (req, res, next) => {
 try {
    const player = await Player.findOne({
         where:{name: req.body.name}
    });
    
   if (player) {
      console.log("Encontro player")
      return res.status(500).send({ message: "Nombre Ya existente" });
   }
   else{
     next();
   }

 } catch (error) {
   console.log(error);
 }
};