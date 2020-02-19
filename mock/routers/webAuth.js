const { Router } = require("express");

const webAuthRouter = Router();

webAuthRouter.get("/current", (req, res) => {
  res.json({ user: "" });
});

module.exports = webAuthRouter;
