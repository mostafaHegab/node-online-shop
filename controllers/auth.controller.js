const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

exports.getSignup = (req, res, next) => {
    res.render("signup", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
        pageTitle: "Signup"
    });
};

exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect("/login"))
            .catch(err => {
                req.flash("authError", err);
                res.redirect("/signup");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/signup");
    }
};

exports.getLogin = (req, res, next) => {
    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
        pageTitle: "Login"
    });
};

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then(result => {
                req.session.userId = result.id;
                req.session.isAdmin = result.isAdmin;
                res.redirect("/");
            })
            .catch(err => {
                req.flash("authError", err);
                res.redirect("/login");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/login");
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
