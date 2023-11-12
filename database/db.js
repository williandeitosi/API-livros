const mongoose = require("mongoose");

const conectionDB = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORLD_DB}@api-livros.pmjxeyj.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Erro de conexão com MongoDB"));
  db.once("open", () => console.log("MongoDB is connected"));
};

module.exports = conectionDB