const films = require('../models/films');

class CreateController {
    create(req, res) {
        res.render('create');
    }
    store(req, res) {
        const film = new films(req.body); 
        film.save()
            .then(() => {
                res.redirect('/film');
            })
            .catch(err => {
                res.json(err);
            })

    }
}

module.exports = new CreateController();
