import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  sound: { type: String, required: true }
 })

export default class DogsService {
  get repository() {
    return mongoose.model("dog", _schema)
  }
}
