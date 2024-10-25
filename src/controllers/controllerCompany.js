import serviceCompany from "../services/serviceCompany.js";

async function getCompanyHighlights(req, res) {
  try {
    const id = req.id_user;
    const companies = await serviceCompany.getCompanyHighlights(id);
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company highlights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function CompanyList(req, res) {
  try {
    const id = req.id_user;
    const search = req.query.search;
    const companies = await serviceCompany.CompanyList(id, search);

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company highlights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addFavorites(req, res) {
  try {
    const id_user = req.id_user;
    const id_company = req.params.id_company;

    const companies = await serviceCompany.addFavorites(id_user, id_company);

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company addFavorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
 
async function deleteFavorites(req, res) {
  try {
    const id_user = req.id_user;
    const id_company = req.params.id_company;
    const companies = await serviceCompany.deleteFavorites(id_user, id_company);

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company deleteFavorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
} 

async function Menu(req, res) {
  try {
    const id_user = req.id_user;
    const id_company = req.params.id_company;
    const companies = await serviceCompany.Menu(id_user, id_company);

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching Menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
} 

async function listProduct(req, res) {
  try {
    const id_company = req.params.id_company;
    const id_product = req.params.id_product;
    const companies = await serviceCompany.listProduct(id_company,id_product);
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company listProduct:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { getCompanyHighlights, CompanyList, addFavorites,deleteFavorites, Menu,listProduct };
