const controller = require("app/http/controller/controller")

class AdminController extends controller {

    index(req, res) {
        res.render('admin/index')
    }
}


module.exports=new AdminController()