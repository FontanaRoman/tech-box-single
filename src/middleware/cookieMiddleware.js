const db = require("../../database/models");

function cookieMiddleware(req, res, next) {
  if (req.cookies.recordame !== undefined && req.session.UserLogged === undefined) {
    db.User.findOne({
      where: {
        email: req.cookies.recordame,
      },
    })
      .then(user => {
        if (user) {
          req.session.UserLogged = user;
        }
        next();
      })
      .catch(error => {
        console.error("Error de consulta en db", error);
        next();
      });
  } else {
    next();
  }
}

module.exports = cookieMiddleware;
