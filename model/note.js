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
    // return this.data
    var newArr = []
    for (var i = 0; i < this.data.length; i++) {
        var title = this.data[i].title
        var created_time = this.data[i].created_time
        var id = this.data[i].id
        newArr[i] = {
            title: title,
            created_time: created_time,
            id: id
        }
    }
    return newArr
}

b.article = function(form) {
    var id = form.id
    for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].id) {
            return this.data[i]
        }
    }
}

b.new = function(form) {
    var m = new ModelNote(form)
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
