const { Router } = require("express");

const MenuRouter = Router();

MenuRouter.get("/", (req, res) => {
  res.json([
    {
      // Title to be shown in side menu
      title: "Home",
      // Component to be used (defined in src/components/Router/SwitchBoard/routeMap
      component: "home",
      id: 1,
      // Parent id of menu. Used to construct path to component
      parentId: null,
      // Order of Menu when we have same parent
      order: 1,
      // Whether user need to be logged in for this menu
      isPrivate: true,
      // Path based on parent menu path
      path: "",
      // React Router isExact
      isExact: true,
      // Whether the menu is hidden (useful for adding screens that are not visible in menu)
      isHidden: false,
      // Icon (defined in src/components/icons/lib
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
