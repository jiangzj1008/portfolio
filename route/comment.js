const comment = require('../model/comment')

var all = {
    path: '/api/comment/all',
    method: 'get',
    func: function(request, response) {
        var comments = comment.all()
        var r = JSON.stringify(comments)
        response.send(r)
    }
}

var routes = [
    all
]

module.exports.routes = routes
