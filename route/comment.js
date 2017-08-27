const comment = require('../model/comment')

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
    path: '/api/comment/main',
    method: 'get',
    func: function(request, response) {
        var path = 'comment.html'
        sendHtml(path, response)
    }
}

var all = {
    path: '/api/comment/all',
    method: 'get',
    func: function(request, response) {
        var comments = comment.all()
        var r = JSON.stringify(comments)
        response.send(r)
    }
}

var add = {
    path: '/api/comment/add',
    method: 'post',
    func: function(request, response) {
        var form = request.body
        var c = comment.new(form)
        var r = JSON.stringify(c)
        response.send(r)
    }
}

var routes = [
    main,
    all,
    add,
]

module.exports.routes = routes
