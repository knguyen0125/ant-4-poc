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
      isHidden: false,
      icon: 'home'
    },
    {
      title: "Money Transfer",
      component: "dummy",
      id: 2,
      parentId: null,
      order: 2,
      isPrivate: true,
      path: "money-transfer",
      isExact: true,
      isHidden: false,
      icon: 'moneyTransfer'
    },
    {
      title: "Domestic",
      component: "dummy",
      id: 3,
      parentId: 2,
      order: 1,
      isPrivate: true,
      path: "domestic",
      isExact: false,
      isHidden: false
    },
    {
      title: "International",
      component: "dummy",
      id: 6,
      parentId: 2,
      order: 2,
      isPrivate: true,
      path: "international",
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
