const accounts = require('../models/accounts');

const bcrypt = require('bcrypt');

class registerController {
    register(req, res, next) {

        res.render('register')

    }
    async store(req, res, next) {
        const fullname = req.body.fullname;
        const email = req.body.email;
        console.log(req.body.password)
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword)
        // const formData = req.body;
        if (hashedPassword) {
            let account = await new accounts({ fullname, email,password: hashedPassword });
            console.log(account);
            accounts.findOne({ email: email })
                .then(data => {
                    if (data) {
                        res.json('Email đăng ký tồn tại !')
                    } else {
                        account.save()
                            .then(() => res.redirect('/'))
                            .catch(err => {
                                console.log(err);
                            });
                        return;
                    }
                })
        }
        // const account = new accounts(fullname, email, hashedPassword);
        // const account = new accounts(formData)
        // account.save()
        //     .then(() => res.redirect('/'))
        //     .catch(err => {
        //         console.log(err);
        //     });

    }
}
module.exports = new registerController();