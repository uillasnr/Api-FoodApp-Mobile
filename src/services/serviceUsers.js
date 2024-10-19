import repositoryUsers from "../repositories/repositoryUsers.js";
import bcrypt from "bcrypt";

async function CreateUser(
  name,
  email,
  password,
  address,
  additional,
  neighborhood,
  city,
  state,
  zip_code,
  isAdmin 
) {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await repositoryUsers.CreateUser(
    name,
    email,
    hashPassword,
    address,
    additional,
    neighborhood,
    city,
    state,
    zip_code,
    isAdmin 
  );
  return newUser;
}

async function Login(email) {
  const user = await repositoryUsers.Login(email);

  if (!user) {
    return null;
  }

  return user;
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

async function Perfil(id) {
  const userProfile = await repositoryUsers.Perfil(id);

  if (!userProfile) {
    return null;
  }

  return userProfile;
}

async function favorites(id) {
  const favorites = await repositoryUsers.favorites(id);
  return favorites;
}

export default { CreateUser, Login, verifyPassword, Perfil, favorites };
