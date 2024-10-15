import repositoryUsers from "../repositories/repositoryUsers.js";

async function CreateUser(
  name,
  email,
  password,
  address,
  additional,
  neighborhood,
  city,
  state,
  zip_code
) {
  const newUser = await repositoryUsers.CreateUser(
    name,
    email,
    password,
    address,
    additional,
    neighborhood,
    city,
    state,
    zip_code
  );
  return newUser;
}

async function favorites(id) {
  const favorites = await repositoryUsers.favorites(id);
  return favorites;
}

export default { CreateUser, favorites };
