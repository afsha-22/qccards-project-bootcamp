const { authJwt } = require("../middleware");
const controller = require("../controllers/pfi.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post("/api/pfi/model", controller.getModelInfo);

      app.post("/api/pfi/schedule", controller.getSAPSchedule);

      app.post("/api/pfi/parts", controller.getRelatedPFI);

      app.post("/api/pfi/partdetails", controller.getPartDetails);
}
