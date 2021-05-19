const films = require('../../app/models/films');

class UpdateController {
    update(req, res) {
        res.render('update');
    }
    store(req, res) {
        const film = new films(req.body); 
        console.log('film: ' +  film);
        film.save()
            .then(() => {
                res.redirect('/film');
            })
            .catch(err => {
                res.json(err);
            })

    }
}

module.exports = new UpdateController();
