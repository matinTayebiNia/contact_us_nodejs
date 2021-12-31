const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = Schema({
    name: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    rememberToken: {type: String, default: null,},
}, {timestamps: true, toJSON: {virtuals: true}});

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
    //با اضافه کردن این خط در صورتی که رمز عبور تغییر نکرده باشه کدهای بعدی اجرا نمیشه
    if (!this.isModified('password')) return next();
    let salt = Bcrypt.genSaltSync(15);
    this.password = Bcrypt.hashSync(this.password, salt);
    next()
})


UserSchema.methods.setRememberToken = function (res) {
    const Token = uniqueString();
    res.cookie('remember_token', Token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        signed: true,
    })
    this.update({rememberToken: Token}, err => {
        if (err) console.error(err)
    })
}

UserSchema.methods.comparePassword = function (password) {
    return Bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
