const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  let pokemon = pokedex
  for(let q in req.query){
    switch (q){
      case 'gte':{
        pokemon = pokemon.filter(x => x.base.HP >= req.query[q])
        break
      }
      case 'lte':{
        pokemon = pokemon.filter(x => x.base.HP <= req.query[q])
        break
      }
      case 'gt':{
        pokemon = pokemon.filter(x => x.base.HP > req.query[q])
        break
      }
      case 'lt':{
        pokemon = pokemon.filter(x => x.base.HP < req.query[q])
        break
      }
      default: res.json({"error": "Invalid Operator. Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]"})
    }
  }
  if(!pokemon) res.json({"error": "Not found"})
  else res.json(pokemon)
  return;
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  let pokemon = pokedex.find(x => x.id == req.params.id)
  if(!pokemon) res.json({"error": "Not found"})
  else res.json(pokemon)
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  let name = req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase()
  let pokemon = pokedex.find(x => x.name.english == name)
  if(!pokemon) res.json({"error": "Not found"})
  else res.json(pokemon)
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  let type = req.params.type[0].toUpperCase() + req.params.type.slice(1).toLowerCase()
  let pokemon = pokedex.filter(x => x.type == type)
  if(!pokemon) res.json({"error": "Not found"})
  else res.json(pokemon)
  return;
});

module.exports = router;