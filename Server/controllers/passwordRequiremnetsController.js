const express = require("express");
const router = express.Router();
const logger = require ('../logger')
const passReq = require("../config.json");


module.exports.getPassRequirements = async (req, res) => {
  try {
      res.json(passReq["password requirements"]);
  } catch (err) {
    logger.serverLogger.log('error', err)
    res.status(500).send("unable to fetch the requirements file")
  }
};