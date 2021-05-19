const films = require('../models/films');
const accounts = require('../models/accounts');
const jwt = require('jsonwebtoken');
const path = require('path')
var fs = require('fs');
// var publicKey = fs.readFileSync('.../key/domain.key');
var publicKey = fs.readFileSync(path.resolve('film/src/key/publickey.cr'));

class SearchController {
    async search(req, res) {
        function ObjectLength( object ) {
            var length = 0;
            for( var key in object ) {
                if( object.hasOwnProperty(key) ) {
                    ++length;
                }
            }
            return length;
        };
        var name = req.query.name.toLowerCase().trim();
        const token = req.cookies.token;
        const result = jwt.verify(token, publicKey, { algorithms: ['RS256']});
        var account_temp = await accounts.findOne({ _id: result._id })
            .then(account => {
                account = account.toObject();
                return account;
            })
        var film_temp = await films.find({})
            .then(listfilm => {
                listfilm = listfilm.map(film => film.toObject())
                return listfilm;
            })
        var data = await film_temp.filter(film => film.name.toLowerCase().includes(name));
        var count = await ObjectLength(data);
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        var totalPage = await (Math.ceil(count / perPage));

        res.render('film', { listfilm: data.slice(start, end), account: account_temp, totalPage: totalPage })
    }
}

module.exports = new SearchController();