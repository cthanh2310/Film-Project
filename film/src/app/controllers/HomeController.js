class HomeController {
    home(req, res){
        // res.send('HELLo')
        res.render('home')
    }
}

module.exports = new HomeController();