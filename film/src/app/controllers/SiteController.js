class SiteController{
    // [GET]/home
    index(req, res){

        res.json({
            name: 'test',
        })

    //  res.render('home');
    }
    // [GET] / news/slug
    search(req, res){
        res.render('search');
    }

}
   

module.exports = new SiteController(); // Tạo ra 1 đối tượng rồi exports ra ngoài,     exports cái gì thì khi require nhận được giá trị đó


// const siteController = require('./SiteController.js');