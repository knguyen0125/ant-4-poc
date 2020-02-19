const { Router } = require("express");

const MenuRouter = Router();

MenuRouter.get("/", (req, res) => {
  res.json([
    {
      title: "Home",
      component: "home",
      id: 1,
      parentId: null,
      order: 1,
      isPrivate: true,
      path: "",
      isExact: true,
      isHidden: false
    },
    {
      title: "Service",
      component: "dummy",
      id: 2,
      parentId: null,
      order: 2,
      isPrivate: true,
      path: "service",
      isExact: true,
      isHidden: false
    },
    {
      title: "Service List",
      component: "service",
      id: 3,
      parentId: 2,
      order: 1,
      isPrivate: true,
      path: "list",
      isExact: false,
      isHidden: false
    },
    {
      title: "Service List Edit",
      component: "service",
      id: 6,
      parentId: 3,
      order: 1,
      isPrivate: true,
      path: "test",
      isExact: false,
      isHidden: false
    },
    {
      title: "Service With Params",
      component: "serviceWithParams",
      id: 4,
      parentId: 2,
      order: 2,
      isPrivate: true,
      path: ":id",
      isExact: false,
      isHidden: true
    }
  ]);
});

module.exports = MenuRouter;
