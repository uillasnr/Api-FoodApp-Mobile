import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretToken = process.env.SECRET_TOKEN; 

function CreateJWT(id_user) {
  const token = jwt.sign({ id_user }, secretToken, {
    expiresIn: "5d",
  });
  return token;
}

function ValidateJwt(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const token = authToken.split(" ")[1]; 

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.id_user = decoded.id_user;
    next();
  });
}

export default { CreateJWT, ValidateJwt };
