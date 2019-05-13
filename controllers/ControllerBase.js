import express from 'express';

//not really sure what's going on in here.

export default class ControllerBase {
  __intercept(req, res, next) {
    this.request = req;
    this.response = res;
    this.next = next;
  }
  constructor() {
    this.router = express.Router();
    this.router
      .all("", this.__intercept)
      .use("", (err, req, res, next) => {
        console.error(err);
        res.status(400).send(err);
      });
  }
  Ok(data) {
    this.response.status(200).send(data)
  }

  /**
   * This method sends a 400 error 
   * @param {Error} error
   */
  BadRequest(error) {
    this.response.status(400).send(error)
  }

  Forbidden(err) {
    this.response.status(401).send(err)
  }

  Failed(err) {
    this.response.status(500).send(err)
  }
}
