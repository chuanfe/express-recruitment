var Jobs = require('../models/jobs')

exports.index = function(req, res) {
    Jobs.fetch(function(err, jobs) {
        console.log('user in session:')
        console.log(req.session.user)
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '好职得 首页',
            jobs: jobs
        })
    }) 
}
