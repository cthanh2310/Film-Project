const films = require('../models/films');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class UpdateController {
    async update(req, res) {
        films.find({})
            .then((films) => {
                res.render('update', { films: mutipleMongooseToObject(films) });
            })
    }
    async update_post(req, res) {
        films.find({})
            .then(async films => {
                films = await mutipleMongooseToObject(films);
                return res.json(films);
            })
    }
    async store(req, res, next) {
        var id = req.body.id;
        console.log(id)
        films.updateOne({_id: id}, req.body)
            .then(() => res.redirect('/update'))
            .catch(next)
    }


}
module.exports = new UpdateController();