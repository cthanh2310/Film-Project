const films = require('../models/films');
const { mutipleMongooseToObject} = require('../../util/mongoose');
class deleteController {
    delete(req, res, next) {
        films.find({})
            .then(films => {
                res.render('delete', {
                    films: mutipleMongooseToObject(films)
                })
            })
            .catch(next)
    }
    delete_post(req, res, next){
        films.find({})
            .then(films =>{
                return res.json(mutipleMongooseToObject(films));
            })
            .catch(next)
    }

}

module.exports = new deleteController();