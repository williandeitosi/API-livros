const express = require("express");
const router = express.Router();
const { gerarToken } = require('./jwt/jwt');
const User = require('./models/User');

router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Verifique se o usuário já existe
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // Crie um novo usuário
    const newUser = new User({ userName, password });
    await newUser.save();

    // Gere um token para o novo usuário
    const token = gerarToken(newUser);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const usuarioAutenticado = await User.findOne({ userName });

    if (!usuarioAutenticado || !(await bcrypt.compare(password, usuarioAutenticado.password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gere um token para o usuário autenticado
    const token = gerarToken(usuarioAutenticado);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
router.use(verificarToken);


module.exports = router;
