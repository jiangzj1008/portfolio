class Note extends Page {
    constructor() {
        super('note')
        this.setup()
    }
    setup() {
        this.bindSubmit()
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
        var time = d.toLocaleString()
        var t = `
        <div class="note-item">
            <h3 class="note-title">${obj.title}</h3>
            <p class="note-time">${time}</p>
            <p class="note-content">${obj.content}</p>
        </div>
        `
        return t
    }
    insert(arr) {
        var self = this
        var html = ''
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i]
            var t = self.template(data)
            html += t
        }
        var wrap = e('.note-wrap')
        wrap.innerHTML += html
    }
    bindSubmit() {
        var self = this
        var main = self.container
        main.addEventListener('click', function(evt) {
            var target = evt.target
            if (target.classList.contains('note-submit')) {
                self.add()
            }
        })
    }
}
