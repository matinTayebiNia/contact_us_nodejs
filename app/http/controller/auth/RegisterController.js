const controller = require("app/http/controller/controller")
const passport = require('passport');
class RegisterController extends controller {

    showRegisterForm(req, res) {
        const title = 'صفحه عضویت';
        res.render('auth/register', {
            title
        });
    }
    async RegisterProccess(req, res, next) {
        let result = await this.ValidationData(req);
        if (result) return this.register(req, res, next);
        return this.back(req, res);
    }
    async register(req, res, next) {
        passport.authenticate('local.register', async (err, user) => {
                if (user) {
                    req.logIn(user, err => {
                        if (err) return this.error('مشکلی در سیستم به وجود آمده لطفا با پشتبانی تماس بگیرید', 500)
                        this.alert(req, {
                            title: "موفقیت",
                            message: "ثبت نام با موفقیت انجام شد ",
                            icon: "success",
                            button: "باشه"
                        })
                    })
                    return res.redirect('/')
                }
                return this.back(req, res);
            }
        )(req, res, next);
    }

}

module.exports = new RegisterController();