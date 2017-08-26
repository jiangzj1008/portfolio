const note = require('../model/note')

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
    path: '/api/note/main',
    method: 'get',
    func: function(request, response) {
        var path = 'note.html'
        sendHtml(path, response)
    }
}

var all = {
    path: '/api/note/all',
    method: 'get',
    func: function(request, response) {
        var notes = note.all()
        var r = JSON.stringify(notes)
        response.send(r)
    }
}

var input = {
    path: '/api/note/input',
    method: 'get',
    func: function(request, response) {
        var path = 'input.html'
        sendHtml(path, response)
    }
}

var add = {
    path: '/api/note/add',
    method: 'post',
    func: function(request, response) {
        var form = request.body
        console.log(form);
        var c = note.new(form)
        var r = JSON.stringify(c)
        response.send(r)
    }
}

var routes = [
    main,
    all,
    input,
    add,
]

module.exports.routes = routes
