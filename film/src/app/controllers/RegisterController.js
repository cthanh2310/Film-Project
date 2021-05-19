const accounts = require('../models/accounts');

const bcrypt = require('bcrypt');

class registerController {
    register(req, res, next) {

        res.render('register')

    }
    async store(req, res, next) {
        const fullname = req.body.fullname;
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword)
        // const formData = req.body;
        const account = new accounts({ fullname, email, hashedPassword });
        console.log(account);
        // const account = new accounts(fullname, email, hashedPassword);
        // const account = new accounts(formData)
        accounts.findOne({ email: email })
            .then(data => {
                if (data) {
                    res.json('Email đăng ký tồn tại !')
                } else {
                    const account = new accounts({ fullname, email, hashedPassword });
                    account.save()
                        .then(() => res.redirect('/'))
                        .catch(err => {
                            console.log(err);
                        });
                    return;
                }
            })
        // account.save()
        //     .then(() => res.redirect('/'))
        //     .catch(err => {
        //         console.log(err);
        //     });

    }
}
module.exports = new registerController();