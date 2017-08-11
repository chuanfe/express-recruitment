var _ = require('underscore')
var Jobs = require('../models/jobs')

//admin job_entry
exports.new = function(req, res) {
    res.render('job_entry', {
        title:'职位录入页面',
        job: {
            name: '',
            min_salary: '',
            max_salary: '',
            img: '',
            district: '',
            description: '',
            requirement: '',
            company_intro: ''
        }
    })
}

// admin update job
exports.update = function(req, res) {
    var id = req.params.id

    if(id) {
        Jobs.findById(id, function(err, job) {
            if(err) {
                console.log(err)
            }
            res.render('job_entry', {
                title: '职位更新页',
                job: job
            })
        })
    }
}


//admin save job
exports.save = function(req, res) {
    var id = req.body.job._id
    var jobObj = req.body.job
    var _job
    console.log("jobObj",jobObj)

    if (id !== 'undefined' && id !== '') {
        Jobs.findById(id, function(err, job) {
            if(err) {
                console.log(err)
            }

            _job = _.extend(job, jobObj)
            _job.save(function(err, job) {
                if(err) {
                    console.log(err)
                }
                res.redirect('/job/' + job._id)
            })
        })
    }
    else {
        if(jobObj.recommend === '是') {
            jobObj.recommend = true
        } else {
            jobObj.recommend = false
        }
        _job = new Jobs({
            name: jobObj.name,
            city: jobObj.city,
            experience: jobObj.experience,
            education: jobObj.education,
            welfare: jobObj.welfare,
            company: jobObj.company,
            min_salary: jobObj.min_salary,
            max_salary: jobObj.max_salary,
            img: jobObj.img,
            district: jobObj.district,
            recommend: jobObj.recommend,
            offers_number: jobObj.offers_number,
            description: jobObj.description,
            requirement: jobObj.requirement,
            company_intro: jobObj.company_intro
        })

        _job.save(function(err, job) {
            if(err) {
                console.log(err)
            }
            res.redirect('/job/' + job._id)
        })
    }
}

// job list page
exports.job_list = function(req, res) {
    Jobs.fetch(function(err, jobs) {
        if(err) {
            console.log(err)
        }
        res.render('job_list', {
            title: '职位列表页',
            jobs: jobs
        })
    })
}

// admin list page
exports.job_admin_list = function(req, res) {
    Jobs.fetch(function(err, jobs) {
        if(err) {
            console.log(err)
        }
        res.render('job_admin_list', {
            title: '职位列表页',
            jobs: jobs
        })
    })
}

// job detail page
exports.detail = function(req, res) {
    var id = req.params.id

    Jobs.findById(id, function(err, job){
        res.render('job_detail', {
            title: '好职得 ' + job.name,
            job: job
        })
    })
}

//list delete job
exports.del = function(req, res) {
    var id = req.query.id
    if(id) {
        Jobs.remove({_id: id}, function(err, job) {
            if(err) {
                console.log(err)
            }
            else {
                res.json({success: 1})
            }
        })
    }
}

