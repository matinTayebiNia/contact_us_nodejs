const autoBind = require("auto-bind")
const {validationResult} = require('express-validator/check')

module.exports = class controller {
    constructor() {
        autoBind(this)
    }

    alert(req, data) {
        let title = data.title || '',
            message = data.message || '',
            iconInfo = data.icon || '',
            button = data.button || null,
            timer = data.timer || 2000,
            toast = data.toast || false;
        req.flash('sweetAlert', {title, message, iconInfo, button, timer, toast});
    }

    async ValidationData(req) {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            const errors = result.array();
            const message = [];
            errors.map(item => {
                message.push({'param': item.param, 'msg': item.msg})
            })
            req.flash('errors', message);
            return false;
        }
        return true;
    }

    back(req, res) {
        req.flash('old', req.body);
        return res.redirect(req.header('Referer') || '/')
    }


}