import mongoose from 'mongoose'
export default class DogsService {
  get schema() {
    return new mongoose.Schema({
      name: { type: String, required: true },
      sound: { type: String, required: true }
    })
  }

  //don't fully grasp what's happening here.
  //looks like a getter that's instantiating a model, we're passing in a name for the model and the schema for that model. i'm a little lost though.

  get repository() {
    return mongoose.model("dog", this.schema)
  }
}