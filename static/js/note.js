class Note extends Page {
    constructor() {
        super('note')
        this.md = new Remarkable()
        this.setup()
    }
    setup() {
        this.bindEvents()
    }
    all() {
        var self = this
        var request = {
            method: 'get',
            url: '/api/note/all',
            contentType: 'application/json',
            callback: function(response) {
                var data = JSON.parse(response)
                var wrap = e('.note-wrap')
                wrap.innerHTML = ''
                self.insert(data)
            }
        }
        ajax(request)
    }
    verify() {
        var f = {}
        var inputs = es('.note-input')
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i]
            var val = input.value.trim()
            var key = input.dataset.key
            if (val === '') {
                alert('请不要留空。')
                return undefined
            } else {
                f[key] = val
            }
        }
        return f
    }
    add() {
        var self = this
        var form = self.verify()
        if (form === undefined) {
            return
        }
        var data = JSON.stringify(form)
        var request = {
            method: 'post',
            url: '/api/note/add',
            data: data,
            contentType: 'application/json',
            callback: function(response) {
                var data = JSON.parse(response)
                var arr = [data]
                self.insert(arr)
                alert('成功')
            }
        }
        ajax(request)
    }
    template(obj) {
        var d = new Date(obj.created_time * 1000)
        // var content = this.md.render(obj.content)
        var time = d.toLocaleString().split(' ')[0]
        var t = `
            <div class="note-item">
                <h3 class="note-title" data-id=${obj.id}>· ${obj.title}</h3>
                <p class="note-time">${time}</p>
            </div>
        `
        return t
    }
    insert(arr) {
        var self = this
        var html = ''
        for (var i = arr.length-1; i >= 0; i--) {
            var data = arr[i]
            var t = self.template(data)
            html += t
        }
        var wrap = e('.note-wrap')
        wrap.innerHTML += html
    }
    // 预览功能
    preview() {
        var input = e('.note-input-content')
        var output = e('.note-output')
        var src = input.value
        var html = this.md.render(src)
        output.innerHTML = html
    }
    // 阅读文章
    display(data) {
        var d = new Date(data.created_time * 1000)
        var content = this.md.render(data.content)
        var time = d.toLocaleString()
        var t = `
            <div class="article-wrap">
                <h3 class="article-title">${data.title}</h3>
                <p class="article-time">${time}</p>
                <div class="article-content">${content}</div>
            </div>
        `
        var wrap = e('#main')
        wrap.innerHTML = t
    }
    // 获取文章
    article(id) {
        var self = this
        var form = {
            id: id
        }
        var data = JSON.stringify(form)
        var request = {
            method: 'post',
            url: '/api/note/article',
            data: data,
            contentType: 'application/json',
            callback: function(response) {
                var data = JSON.parse(response)
                self.display(data)
            }
        }
        ajax(request)
    }
    bindEvents() {
        var self = this
        var main = self.container
        main.addEventListener('keyup', function(evt) {
            var target = evt.target
            if (target.classList.contains('note-input-content')) {
                self.preview()
            }
        })
        main.addEventListener('click', function(evt) {
            var target = evt.target
            if (target.classList.contains('note-submit')) {
                self.add()
            } else if (target.classList.contains('note-title')) {
                var id = target.dataset.id
                location.hash += `/${id}`
            } else if (target.classList.contains('note-btn-write')) {
                var form = e('.note-form')
                form.classList.add('on')
            } else if (target.classList.contains('note-form')) {
                var form = e('.note-form')
                form.classList.remove('on')
            } else if (target.classList.contains('note-reset')) {
                var title = e('.note-input-title')
                var content = e('.note-input-content')
                title.value = ''
                content.value = ''
            }
        })
    }
}
