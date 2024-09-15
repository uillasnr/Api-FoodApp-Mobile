import { Router } from "express";

const router = Router();

router.post("/users/login", (req, res) => {
  res.status(200).json({ mensagem: "success" });
});

export default router;
