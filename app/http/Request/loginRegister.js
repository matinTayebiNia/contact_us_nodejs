const Request = require("app/http/Request/request")
const {check} = require('express-validator')

class LoginRegister extends Request {

    handel() {
        return [
            check('email')
                .not().isEmpty()
                .withMessage('ایمیل وارد نشده')
                .isEmail()
                .withMessage('ایمیل معتبر نیست'),
            check('password')
                .not().isEmpty()
                .withMessage('رمز عبور وارد نشده')
        ]
    }

}

module.exports = new LoginRegister();