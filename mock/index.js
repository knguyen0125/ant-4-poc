const express = require("express");
const webAuthRouter = require("./routers/webAuth");
const MenuRouter = require("./routers/menu");

const app = express();
const port = 13000;

app.use("/webAuth", webAuthRouter);
app.use("/menu", MenuRouter);

app.get("/", (req, res) => {
  res.json("test");
});

app.listen(port, () => console.log(`Mock server listening on port ${port}`));
