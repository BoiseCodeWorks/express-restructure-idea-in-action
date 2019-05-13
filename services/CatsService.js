import mongoose from 'mongoose'
export default class CatsService {
  get schema() {
    return new mongoose.Schema({
      name: { type: String, required: true }
    })
  }

  get repository() {
    return mongoose.model("cat", this.schema)
  }

}