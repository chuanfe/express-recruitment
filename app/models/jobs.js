var mongoose = require('mongoose')
var JobSchema = require('../schemas/jobs')
var Jobs = mongoose.model('Jobs', JobSchema)

module.exports = Jobs