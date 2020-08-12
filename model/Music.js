const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    singerImg: {
        type: String,
        required: true
    },
    albumImg: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Music', MusicSchema);