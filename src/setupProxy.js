const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  if (process.env.MOCK === 'true') {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:13000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      })
    );
  }
};
