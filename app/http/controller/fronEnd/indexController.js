const controller = require("app/http/controller/controller")
const ContactUs = require("app/models/contact_us")

class IndexController extends controller {

    index(req, res, next) {
        return res.render("home/index",)
    }

    async contact_us(req, res, next) {
        const newContactUs = new ContactUs({
            ...req.body
        })
        let contact = await newContactUs.save();
        if (contact instanceof ContactUs)
            res.json({
                status: "success"
            })

    }

}

module.exports = new IndexController();