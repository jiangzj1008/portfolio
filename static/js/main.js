var commentAll = function() {
    var ct = e('.comment-container')
    ct.classList.add('show')
    var request = {
        method: 'get',
        url: '/api/comment/all',
        contentType: 'application/json',
        callback: function(response) {
            var data = JSON.parse(response)
            var wrap = e('.comment-wrap')
            wrap.innerHTML = ''
            commentInsert(data)
        }
    }
    ajax(request)
}

var commentVerify = function() {
    var f = {}
    var form = e('.comment-form')
    var inputs = form.querySelectorAll('.comment-input')
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

var commentAdd = function() {
    var form = commentVerify()
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
            commentInsert(arr)
        }
    }
    ajax(request)
}

var commentTemplate = function(obj) {
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

var commentInsert = function(arr) {
    var html = ''
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i]
        var t = commentTemplate(data)
        html += t
    }
    var wrap = e('.comment-wrap')
    wrap.innerHTML += html
}

var bindCommentEvent = function() {
    bindEvent('.comment', 'click', commentAll)
    bindEvent('.input-submit', 'click', commentAdd)
}

var bindMainEvent = function() {
    bindEvent('.title', 'click', function() {
        location.pathname = "/"
    })
}


bindMainEvent()
bindCommentEvent()
