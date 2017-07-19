var fs = require('fs')

var filePath = 'db/note.json'

const ModelNote = function(form) {
    this.title = form.title || ''
    this.content = form.content || ''
    this.id = form.id || 0
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
