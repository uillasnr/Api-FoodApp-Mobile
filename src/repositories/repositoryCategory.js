import { execute } from "../database/sqlite.js";

async function List() {

  const sql = "select * from category order by 'order'"; // Certifique-se de que 'order' é uma coluna válida
  const category = await execute(sql, []);
  
  return category;
}

export default { List };
