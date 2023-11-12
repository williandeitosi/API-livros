const express = require("express");
const router = express.Router();
const bookeController = require("../controllers/bookeController");
const { verificarToken } = require("../jwt/jwt");
const User = require("../models/User");

router.use(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const usuario = verificarToken(token);

  if (!usuario) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }

  // Se o token for válido, permite o acesso às rotas protegidas
  next();
});

router.get("/bookes", bookeController.getAllBookes);
router.post("/bookes", bookeController.createBooke);
router.put("/bookes/:id", bookeController.updateBooke);
router.delete("/bookes/:id", bookeController.deleteBooke);

module.exports = router;
