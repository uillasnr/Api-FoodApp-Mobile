import { execute } from "../database/sqlite.js";

async function getCompanyHighlights(id) {
  const sql = `select case when u.id_favorite is null then 'N' else 'S' end as favorite, e.*
  from  highlights d
  JOIN company e ON (e.id_company = d.id_company)
  LEFT JOIN user_favorite u ON u.id_company = e.id_company AND u.id_user = ?
  order by 'd.order'`;
  const companies = await execute(sql, [id]);
  return companies;
}

async function CompanyList(id, search, category_id, banner_id) {
  let sql = `select case when u.id_favorite is null then 'N' else 'S' end as favorite, e.*
             from  company d
             JOIN company e ON (e.id_company = d.id_company)
             LEFT JOIN user_favorite u ON (u.id_company = e.id_company AND u.id_user = ?)
             LEFT JOIN banner b on (b.id_company = e.id_company)
             where e.id_company > 0
             `;

  const params = [id];

  // Adiciona a condição de busca se houver um termo de pesquisa
  if (search) {
    sql += ` AND e.name LIKE ?`; // Corrigido para adicionar "AND"
    params.push(`%${search}%`);
  }

  // Adiciona a condição de filtro pela categoria se houver
  if (category_id) {
    sql += ` AND e.category_id = ?`; // Comparação direta para category_id
    params.push(category_id); // Não precisa de wildcards
  }

  if (banner_id) {
    sql += ` AND b.banner_id = ?`; // Comparação direta para category_id
    params.push(banner_id); // Não precisa de wildcards
  }


  sql += ` order by 'd.order'`;

  const companies = await execute(sql, params);
  return companies;
}

async function addFavorites(id_user, id_company) {
  // Primeiro, busca o maior `id_favorite` atual para incrementá-lo
  const getMaxSql = `SELECT MAX(id_favorite) as max_id FROM USER_FAVORITE`;
  const result = await execute(getMaxSql);
  const maxId = result[0].max_id || 0; // Se não houver favoritos, começa em 0
  const newId = maxId + 1;

  // Insere o favorito com o novo `id_favorite`
  const insertSql = `INSERT INTO USER_FAVORITE (id_favorite, id_user, id_company) 
                     VALUES (?, ?, ?)`;
  await execute(insertSql, [newId, id_user, id_company]);

  return { message: "Favorite added successfully" };
}

async function deleteFavorites(id_user, id_company) {
  const sql = `DELETE FROM user_favorite 
               WHERE id_user = ? 
               AND id_company = ? 
               returning id_favorite`;

  const companies = await execute(sql, [id_user, id_company]);
  return companies[0];
}

async function Menu(id_user, id_company) {
  // obter os dados da empresa e o status de favorito
  const sql = `
    SELECT 
      CASE WHEN u.id_favorite IS NULL THEN 'N' ELSE 'S' END AS favorite,
      e.*
    FROM company e
    LEFT JOIN user_favorite u ON (u.id_company = e.id_company AND u.id_user = ?)
    WHERE e.id_company = ?  -- Filtra pela empresa
  `;

  const company = await execute(sql, [id_user, id_company]);
  //obter os dados do produto
  const itemSql = `
  SELECT 
    p.*, c.category
  FROM PRODUCT p
  JOIN PRODUCT_CATEGORY c ON c.product_category_id = p.product_category_id
  WHERE p.id_company = ? -- Substituir pelo nome correto
  ORDER BY c.[order], p.name
`;


  const itens = await execute(itemSql, [id_company]);


  let result = company[0];
  result.itens = itens;

  return result; 
}

async function listProduct(id_company,id_product) {
  const sql = 
  `SELECT * FROM PRODUCT WHERE id_company = ? and product_id = ?`;
  const product = await execute(sql, [id_company,id_product]);
  return product[0];
}


export default { getCompanyHighlights, CompanyList, addFavorites, deleteFavorites, Menu, listProduct};
