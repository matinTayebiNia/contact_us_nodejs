const autoBind = require("auto-bind")
module.exports = class Helpers {
    constructor(req,) {
        autoBind(this)
        this.req = req;
        this.FormData = req.flash('old')[0];
        this.errorsData = req.flash('errors');
    }

    getUser() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath,
            ...this.globalVariable(),
            req: this.req,

        }
    }

    viewPath(dir) {
        return path.resolve(path.resolve('./resources/views') + '/' + dir)
    }

    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user,
        }
    }

    globalVariable() {
        return {
            errors: this.invalidData,
            old: this.old,
        }
    }

    invalidData(input) {
        for (let i = 0; i < this.errorsData.length; i++) {
            if (this.errorsData[i].param === input) {
                return this.errorsData[i].msg
            }
        }
    }

    old(data, defaultValue = null) {
        return this.FormData && this.FormData[data] ? this.FormData[data] : defaultValue
    }
}