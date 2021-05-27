const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/film_project', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            isOpen: false,
        });
        console.log('Connect successfully!')
    } catch(error){
        console.log('connect failed!!')
    }
}
module.exports = {connect}