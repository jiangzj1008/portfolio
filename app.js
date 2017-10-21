var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('static'))

const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

const routeFiles = [
    './route/index',
    './route/home',
    './route/program',
    './route/comment',
    './route/note'
]

var registerAll = function(routeFiles) {
    for (var i = 0; i < routeFiles.length; i++) {
        var file = routeFiles[i]
        var r = require(file)
        registerRoutes(app, r.routes)
    }
}

registerAll(routeFiles)

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("address is http://%s:%s", host, port)
})
