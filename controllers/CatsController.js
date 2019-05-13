import CatsService from '../services/CatsService'
import express from "express"
import { Authorize } from "../middleware/authorize";

let _service = new CatsService()
let _repo = _service.repository

export default class CatsController {
  constructor() {
    this.router = express.Router()
      .get("", this.getAllCats)
      .get("/:id", this.GetCatById)
      .use(Authorize.role("admin").middleware)
      .post("", this.create)
  }

  async getAllCats(req, res, next) {
    try {
      let cats = await _repo.find({})
      return res.send(cats)
    } catch (err) { next(err) }
  }

  async GetCatById(req, res, next) {
    try {
      let cat = await _repo.findById(req.params.id)
      res.send(cat)
    } catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      let cat = await _repo.create(req.body)
      res.send(cat)
    } catch (err) { next(err) }
  }
}