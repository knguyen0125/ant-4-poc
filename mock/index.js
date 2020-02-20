const express = require("express");
const webAuthRouter = require("./routers/auth");
const MenuRouter = require("./routers/menu");
const morgan = require("morgan");

const app = express();
const port = 13000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", webAuthRouter);
app.use("/menu", MenuRouter);

app.get("/", (req, res) => {
  res.json("test");
});

app.listen(port, () => console.log(`Mock server listening on port ${port}`));
