import { Router } from "express";

import controllerCategory from "./controllers/controllerCategory.js";
import controllerBanner from "./controllers/controllerBanner.js";
import controllerCompany from "./controllers/controllerCompany.js";
import controllerOrders from "./controllers/controllerOrders.js";
import controllerUsers from "../src/controllers/controllerUsers.js";
import jwt from "../src/config/token.js"


const router = Router();

router.post("/users/login", (req, res) => {
  res.status(200).json({ mensagem: "success" });
});

router.post("/login", controllerUsers.Login);
router.post("/create-user", controllerUsers.CreateUser);
router.get("/usuarios/perfil",jwt.ValidateJwt, controllerUsers.Perfil);

router.get("/ListCategory",  jwt.ValidateJwt, controllerCategory.getCategory);
router.get("/banners",jwt.ValidateJwt, controllerBanner.List);

router.get("/empresas/destaques",jwt.ValidateJwt, controllerCompany.getCompanyHighlights);
router.get("/empresas",jwt.ValidateJwt, controllerCompany.CompanyList);
router.post("/empresas/:id_company/favoritos",jwt.ValidateJwt, controllerCompany.addFavorites);
router.delete("/empresas/:id_company/favoritos",jwt.ValidateJwt, controllerCompany.deleteFavorites);
router.get("/empresas/:id_company/menu",jwt.ValidateJwt, controllerCompany.Menu);

router.get("/empresas/:id_company/produto/:id_product",jwt.ValidateJwt, controllerCompany.listProduct);

router.get("/pedidos", jwt.ValidateJwt,controllerOrders.getOrders); 
router.get("/pedidos/:id",jwt.ValidateJwt, controllerOrders.getOrdersId);
router.post("/pedidos", jwt.ValidateJwt,controllerOrders.InsertOrder); 

router.get("/usuarios/favoritos",jwt.ValidateJwt, controllerUsers.Favorites);

export default router;
