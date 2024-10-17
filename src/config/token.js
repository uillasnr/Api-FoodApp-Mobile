import jwt from "jsonwebtoken";

const secretToken = "uillas";

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

  const [aux, token] = authToken.split("");

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err)
         return res.status(401).json({ message: "Token inválido" });

    req.id_user = decoded.id_user;

    next();
  });
}

export default { CreateJWT, ValidateJwt };
