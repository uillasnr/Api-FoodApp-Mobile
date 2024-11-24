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
  const result = await execute(sql, [
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

  return result[0]; // Return all the fields of the new user

}

async function FindByEmail(email) {
  const sql = `SELECT * FROM USER WHERE EMAIL = ?`; 

  const user = await execute(sql, [email]);
  
  return user.length > 0 ? user[0] : null; 
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
  join company e on (e.id_company = f.ID_COMPANY)
  where f.ID_USER = ?`;
  const favorites = await execute(sql, [id]);
  return favorites;
}

export default { CreateUser, Login, Perfil, favorites, FindByEmail };
