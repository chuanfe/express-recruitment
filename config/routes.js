var Jobs = require('../app/controllers/jobs')
var Index = require('../app/controllers/index')
var Search = require('../app/controllers/search')
var User = require('../app/controllers/user')

module.exports = function(app) {

		// pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user

        app.locals.user = _user

        next()
		})
			
    // index page
    app.get('/', Index.index)

    //job
    app.get('/admin/job', User.signinRequired, User.adminRequired, Jobs.new)
    app.get('/admin/job/update/:id', User.signinRequired, User.adminRequired, Jobs.update)
    app.post('/admin/job/new', User.signinRequired, User.adminRequired, Jobs.save)
		app.get('/job/list', Jobs.job_list)
    app.get('/job/:id', Jobs.detail)
    app.delete('/admin/job/list', User.signinRequired, User.adminRequired, Jobs.del)
    app.get('/admin/job/list', User.signinRequired, User.adminRequired, Jobs.job_admin_list)

    // search
    app.get('/search', Search.search_get)
		app.post('/search', Search.search_post)
		
		//user signin or signup
		app.get('/signin', User.showSignin)
		app.get('/signup', User.showSignup)
		app.post('/user/signin', User.signin)
		app.post('/user/signup', User.signup)
		app.get('/logout', User.logout)

		//user assume
		app.get('/user/resume', User.signinRequired, User.showResume)

}
