const Booke = require("../models/Booke");

const getAllBookes = async (req, res) => {
  try {
    const bookeList = await Booke.find();
    return res.json(bookeList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createBooke = async (req, res) => {
  try {
    const newBooke = new Booke(req.body);
    const savedBooke = await newBooke.save();
    return res.status(201).json(savedBooke);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBooke = async (req, res) => {
  try {
    const { id } = req.params;
    const booke = await Booke.findByIdAndUpdate(id, req.body, { new: true });

    if (!booke) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    return res.json(booke);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBooke = async (req, res) => {
  try {
    const { id } = req.params;

    
    const del = await Booke.findByIdAndDelete(id);
    if (!del) {
      return res.status(404).json({ error: "livro não encontrado" });
    }
    return res.json({message: "livro excluido com sucesso"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBookes,
  createBooke,
  updateBooke,
  deleteBooke,
};
