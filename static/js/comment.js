class Comment extends Page {
    constructor() {
        super('comment')
        this.setup()
    }
    setup() {
        this.bindSubmit()
    }
    all() {
        var self = this
        var request = {
            method: 'get',
            url: '/api/comment/all',
            contentType: 'application/json',
            callback: function(response) {
                var data = JSON.parse(response)
                var wrap = e('.comment-wrap')
                wrap.innerHTML = ''
                self.insert(data)
            }
        }
        ajax(request)
    }
    verify() {
        var f = {}
        var inputs = es('.comment-input')
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i]
            var val = input.value.trim()
            var key = input.dataset.key
            if (val === '') {
                alert('请填写姓名及留言，不要留空。')
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
            url: '/api/comment/add',
            data: data,
            contentType: 'application/json',
            callback: function(response) {
                var data = JSON.parse(response)
                var arr = [data]
                self.insert(arr)
            }
        }
        ajax(request)
    }
    template(obj) {
        var d = new Date(obj.created_time * 1000)
        var time = d.toLocaleString()
        var t = `
        <div class="comment-item">
            <img src="" alt="">
            <div class="comment-detail">
                <p class="comment-author">
                    ${obj.author}
                    <span class="comment-time">${time}</span>
                </p>
                <p class="comment-id">#${obj.id}</p>
                <p class="comment-content">${obj.content}</p>
            </div>
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
        var wrap = e('.comment-wrap')
        wrap.innerHTML += html
    }
    bindSubmit() {
        var self = this
        var main = self.container
        main.addEventListener('click', function(evt) {
            var target = evt.target
            if (target.classList.contains('input-submit')) {
                self.add()
            }
        })
    }
}
