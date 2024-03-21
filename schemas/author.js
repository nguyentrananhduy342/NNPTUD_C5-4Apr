const mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

authorSchema.virtual('published', {
    ref: 'book',
    localField: '_id',
    foreignField: 'author'
})
authorSchema.set('toObject', { virtuals: true })
authorSchema.set('toJSON', { virtuals: true })
module.exports = new mongoose.model('author', authorSchema)