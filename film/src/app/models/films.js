const mongoose = require('mongoose')

// const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const films = new Schema({
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 6000},
    category: { type: String, maxLength: 100 },
    image: { type: String, maxLength: 600},
    slug: { type: String, maxLength: 600},
    videoId: { type: String, maxLength: 600},
}, {
    timestamps: true,
});

module.exports = mongoose.model('films', films); // convert chữ thường, nhiều từ thì cách nhau bằng _, thêm thành dạng số nhiều 
