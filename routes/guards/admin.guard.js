module.exports = (req, res, next) => {
    if (req.session.isAdmin) next();
    else res.redirect("/not-admin");
};
