var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data) {
        response.send(data)
    })
}

var main = {
    path: '/api/program/main',
    method: 'get',
    func: function(request, response) {
        var path = 'program.html'
        sendHtml(path, response)
    }
}

var routes = [
    main,
]

module.exports.routes = routes
