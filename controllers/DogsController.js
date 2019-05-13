import DogsService from "../services/DogsService"
import express from 'express'
import { Authorize } from "../middleware/authorize"

let _service = new DogsService()
let _repo = _service.repository

export default class DogsController {
  constructor() {
    //this makes sense; instantiate a router on the controller and set up
    //the CRUD requests when it's created. 
    //Does insantiantiating the express.Router() oupon creation of the controller
    //have anything to do with dependency injection?
    this.router = express.Router()
      .get("", this.getAllDogs)
      .get("/:id", this.getDogById)
      .use(Authorize.role("admin").middleware)
      .post("", this.createDog)
      .delete("/:id", this.deleteDogById)
  }

  async getAllDogs(req, res, next) {
    try {
      let dogs = await _repo.find()
      return res.send(dogs)
    } catch (err) { next(err) }
    //I still don't fully grasp how the catch(err) portion communicates with
    //server.use in the main.js file
  }
  async getDogById(req, res, next) {
    try {
      let dog = await _repo.find(req.params.id)
      res.send(dog)
    } catch (err) { next(err) }
  }
  async createDog(req, res, next) {
    try {
      let dog = await _repo.create(req.body)
    } catch (err) { next(err) }
  }
  async deleteDogById(req, res, next) {
    try {
      await _repo.findByIdAndDelete({ id: req.params.id })
    } catch (err) { next(err) }
  }
}