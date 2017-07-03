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

var design = {
    path: '/design',
    method: 'get',
    func: function(request, response) {
        var path = 'design_index.html'
        sendHtml(path, response)
    }
}

var routes = [
    design
]

module.exports.routes = routes
