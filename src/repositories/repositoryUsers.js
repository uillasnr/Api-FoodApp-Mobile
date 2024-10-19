import { execute } from "../database/sqlite.js";

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
  const sql = `
    INSERT INTO USER (NAME, EMAIL, PASSWORD, ADDRESS, ADDITIONAL, NEIGHBORHOOD, CITY, STATE, ZIP_CODE, IS_ADMIN, REGISTRATION_DATE)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    returning *;
  `;

  // Executa o comando de inserção
  await execute(sql, [
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
  ]);

  // retornar os dados completos
  const findUserSql = `
    SELECT USER_ID as id, NAME, EMAIL, ADDRESS, ADDITIONAL, NEIGHBORHOOD, CITY, STATE, ZIP_CODE, IS_ADMIN
    FROM USER
    WHERE EMAIL = ?
  `;
  const newUser = await execute(findUserSql, [email]);

  return newUser[0]; // Retorna o primeiro (e único) resultado
}

async function Login(email) {
  const sql = `
    SELECT USER_ID as id, NAME, EMAIL, PASSWORD, ADDRESS, ADDITIONAL, NEIGHBORHOOD, CITY, STATE, ZIP_CODE, IS_ADMIN, REGISTRATION_DATE
    FROM USER
    WHERE EMAIL = ?;
  `;
  const user = await execute(sql, [email]);

  return user.length > 0 ? user[0] : null;
}

async function Perfil(id) {
  const sql = `
    SELECT USER_ID as id, NAME, EMAIL, PASSWORD, ADDRESS, ADDITIONAL, NEIGHBORHOOD, CITY, STATE, ZIP_CODE, IS_ADMIN, REGISTRATION_DATE
    FROM USER
    WHERE USER_ID = ?;`;
  const user = await execute(sql, [id]);

  return user.length > 0 ? user[0] : null;
}

async function favorites(id) {
  const sql = `
  select f.*, e.icon, e.name, e.address, e.NEIGHBORHOOD, e.CITY, e.ZIP_CODE, e.ADDITIONAL 
  from user_favorite f 
  join company e on (e.COMPANY_ID = f.ID_COMPANY)
  where f.ID_USER = ?`;
  const favorites = await execute(sql, [id]);
  return favorites;
}

export default { CreateUser, Login, Perfil, favorites };
