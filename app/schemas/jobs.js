var mongoose = require('mongoose')

var JobSchema = new mongoose.Schema({
    name: String,
    company: String,
    city: String,
    min_salary: String,
    max_salary: String,
    experience: String,
    education: String,
    welfare: String,
    company: String,
    tags: Array,
    district: String,
    img: String,
    description: String,
    requirement: String,
    company_intro: String,
    recommend: Boolean,
    offers_number: Number,
    category: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

JobSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

JobSchema.statics = {
    fetch: function(cb) {
        return this
          .find({})
          .sort('meta.updateAt')
          .exec(cb)
    },
    findById: function(id, cb) {
        return this
          .findOne({_id: id})
          .exec(cb)
    },
    findBySearch: function(query, cb) {
        return this
          .find({ name: query.q })
          .exec(cb)
    }
}

module.exports = JobSchema