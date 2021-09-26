const httpError = require("../models/error");
const reclamation = require("../models/reclamation");
const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const { sujet, description, jardinId } = req.body;

  const createdReclamation = new reclamation({
    sujet,
    description,
    jardinId,
    finished: false,
  });

  try {
    await createdReclamation.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ reclamation: createdReclamation });
};

const getReclamation = async (req, res, next) => {
  let existingReclamation;
  try {
    existingReclamation = await reclamation.find();
  } catch {
    const error = new httpError("failed ", 500);
    return next(error);
  }
  res.json({ reclamation: existingReclamation });
};

exports.ajout = ajout;
exports.getReclamation = getReclamation;
