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

b.new = function(form) {
    var m = new ModelComment(form)
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m)
    this.save()
    return m
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(filePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
