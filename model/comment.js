var fs = require('fs')

var filePath = 'db/comment.json'

const ModelComment = function(form) {
    this.author = form.author || ''
    this.content = form.content || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadData = function() {
    var content = fs.readFileSync(filePath, 'utf8')
    var data = JSON.parse(content)
    return data
}

var b = {
    data: loadData()
}

b.all = function() {
    return this.data
}

module.exports = b
