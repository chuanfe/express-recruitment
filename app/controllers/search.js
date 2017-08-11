var Jobs = require('../models/jobs')
// search
exports.search_get = function(req, res) {
    var query = {}
    query.q = new RegExp(req.query.q)
    Jobs.findBySearch(query, function(err, jobs) {
        if(err) {
            console.log(err)
        }
        res.render('search_list', {
            title: '好职得 搜索列表页',
            jobs: jobs
        })
    })
}
// search list post page
exports.search_post = function(req, res) {
    var query = {}
    query.q = new RegExp(req.body.keyword)
    Jobs.findBySearch(query, function(err, jobs) {
        if(err) {
            console.log(err)
        }
        res.render('search_list', {
            title: '好职得 搜索列表页',
            jobs: jobs
        })
    })
}