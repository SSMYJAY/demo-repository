module.exports = {
  isOwner: function (request, response) {
    if (request.session.is_logined) {
      return true;
    } else {
      response.cookie("jwt", "", {
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        httpOnly: false,
      });
      return false;
    }
  },

  statusUI: function (request, response) {
    var authStatusUI = "Log in first!";

    if (this.isOwner(request, response)) {
      authStatusUI = `Welcome, ${request.session.nickname}! | <a href="/auth/logout">Logout</a>`;
    }
    return authStatusUI;
  },
};
