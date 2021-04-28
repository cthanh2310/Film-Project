class LoginController{
    login(req, res){

        res.render('login')
    }
    store(req, res){
        res.send('store');
    }

}
module.exports = new LoginController();