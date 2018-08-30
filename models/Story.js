const mongoose = require('mongoose')

likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
platformSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    platformVote: {type: String, required: true}
})
genreSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    genreVote: {type: String, required: true}
})
  
const storySchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true}, 
    body: {type: String, required: true},
    platform: [platformSchema],
    genre: [genreSchema],
    likes: [likeSchema], 
    _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})  

storySchema.pre('findOne', function(next) {
    this.populate('comments')
    this.populate('acceptedComments')
    next()
})

const Story = mongoose.model('Story', storySchema) 
module.exports = Story