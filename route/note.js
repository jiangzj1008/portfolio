const note = require('../model/note')

var all = {
    path: '/api/note/all',
    method: 'get',
    func: function(request, response) {
        var notes = note.all()
        var r = JSON.stringify(notes)
        response.send(r)
    }
}

var routes = [
    all,
]

module.exports.routes = routes
