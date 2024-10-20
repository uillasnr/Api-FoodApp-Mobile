import { execute } from "../database/sqlite.js";

async function List() {

  const sql = "select * from banner order by 'order'"; // Certifique-se de que 'order' é uma coluna válida
  const banners = await execute(sql, []);
  
  return banners;
}

export default { List };
