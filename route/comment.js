const comment = require('../model/comment')

var all = {
    path: '/api/comment/all',
    method: 'get',
    func: function(request, response) {
        var comments = comment.all()
        var r = JSON.strigify(comments)
        response.send(r)
    }
}
