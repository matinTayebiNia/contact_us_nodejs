const controller = require("app/http/controller/controller")
const passport = require('passport');

class LoginController extends controller {
    showLoginForm(req, res) {
        const title = 'صفحه ورود';

        res.render('auth/login', {
            title
        });
    }

    async loginProccess(req, res, next) {
        let result = await this.ValidationData(req);
        if (result) return this.login(req, res, next)
        return this.back(req, res);
    }

    async login(req, res, next) {
        passport.authenticate('local.login', async (err, user) => {
            if (!user) return res.redirect('/auth/login')

            req.logIn(user, err => {
                if (req.body.remember) {
                    user.setRememberToken(res);
                }
                this.alert(req, {
                    toast: false,
                    title: "موفقیت",
                    message: "شما با موفقیت وارد سیستم شدید",
                    icon: "success",
                })
                return this.back(req, res);
            })
        })(req, res, next);
    }

    logout(req, res) {
        req.logout();
        this.clearRememberCookie(req, res);
        this.alert(req, {
            toast: true,
            title: "شما با موفقیت از سیستم خارج شدید",
            icon: "success",
        })
        res.redirect('/');
    }

    clearRememberCookie(req, res) {
        if (req.signedCookies.remember_token)
            res.clearCookie('remember_token');
    }
}

module.exports = new LoginController()