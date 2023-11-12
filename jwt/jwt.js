const jwt = require('jsonwebtoken');
const segredo = 'seu_segredo_super_secreto';

function gerarToken(usuario) {
  return jwt.sign({ usuario }, segredo, { expiresIn: '1h' });
}

function verificarToken(token) {
  try {
    const payload = jwt.verify(token, segredo);
    return payload.usuario;
  } catch (error) {
    return null; // Token inválido
  }
}

module.exports = { gerarToken, verificarToken };
