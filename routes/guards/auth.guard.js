exports.isAuth = (req, res, next) => {
    if (req.session.userId) next();
    else res.redirect("/login");
};

exports.notAuth = (req, res, next) => {
    if (!req.session.userId) next();
    else res.redirect("/");
};
