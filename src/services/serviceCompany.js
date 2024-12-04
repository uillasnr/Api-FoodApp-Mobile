import repositoryCompany from "../repositories/repositoryCompany.js";

async function getCompanyHighlights(id) {
  const companies = await repositoryCompany.getCompanyHighlights(id);
  return companies;
}

async function CompanyList(id, search, category_id, banner_id) {
  const companies = await repositoryCompany.CompanyList(id, search, category_id, banner_id);
  return companies;
}

async function addFavorites(id_user, id_company) {
  const companies = await repositoryCompany.addFavorites(id_user, id_company);
  return companies;
}

 async function deleteFavorites(id_user, id_company) {
  const companies = await repositoryCompany.deleteFavorites(id_user, id_company);
  return companies;
} 

async function Menu(id_user, id_company) {
  const menu = await repositoryCompany.Menu(id_user, id_company);
  return menu;
} 

async function listProduct(id_company,id_product) {
  const listProduct = await repositoryCompany.listProduct(id_company,id_product);
  return listProduct;
}

export default { getCompanyHighlights, CompanyList, addFavorites, deleteFavorites,Menu,listProduct };
