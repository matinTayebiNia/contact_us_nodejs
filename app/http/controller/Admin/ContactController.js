const controller = require("app/http/controller/controller")
const ContactUs = require("app/models/contact_us")

class ContactController extends controller {

    async index(req, res) {
        const contacts = await ContactUs.find({})
        return res.render("admin/contact_us/index", {
            title: "درخواست های کاربران ",
            contacts
        })
    }

    async destroy(req, res) {

        let contact = await ContactUs.findById(req.body.contact_id);

        if (!contact) {
            return this.back(req, res)
        }
        //  delete contact
        await contact.remove();
        this.alert(req, {
            toast: true,
            title: "درخواست مورد نظر با موفقیت حذف شد",
            icon: "success"
        })
        res.redirect('/admin/contact_us')

    }


}

module.exports = new ContactController();