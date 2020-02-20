const { Router } = require("express");
const HttpStatus = require("http-status-codes");

const webAuthRouter = Router();

let loggedInUser = null;

webAuthRouter.post("/login", (req, res) => {
  loggedInUser = {
    user: req.body.username
  };

  return res.json(loggedInUser);
});

webAuthRouter.get("/current", (req, res) => {
  if (!loggedInUser) {
    return res.status(HttpStatus.UNAUTHORIZED).json();
  }

  return res.json(loggedInUser);
});

webAuthRouter.get("/logout", (req, res) => {
  loggedInUser = null;

  return res.status(HttpStatus.ACCEPTED).json();
});

module.exports = webAuthRouter;
