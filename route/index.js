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

var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        var path = 'index.html'
        sendHtml(path, response)
    }
}

var design = {
    path: '/design',
    method: 'get',
    func: function(request, response) {
        var path = 'design.html'
        sendHtml(path, response)
    }
}

var routes = [
    index,
    design
]

module.exports.routes = routes
