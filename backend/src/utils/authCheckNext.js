module.exports = {
  isOwner: function (request, response, next) {
    if (request.session.is_logined) {
      return next();
    } else {
      response.cookie("jwt", "", {
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        httpOnly: false,
      });
      return response.status(403).send("No authorization");
    }
  },
};
