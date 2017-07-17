var commentAll = function() {
    var request = {
        method: 'get',
        url: '/api/comment/all',
        contentType: 'application/json',
        callback: function(response) {
            var data = JSON.parse(response)
            console.log(data)
            insertComment(data)
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
        f[input.dataset.key] = input.value
    }
    return f
}

var commentAdd = function() {
    var form = commentVerify()
    var data = JSON.stringify(form)
    var request = {
        method: 'post',
        url: '/api/comment/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            var data = JSON.parse(response)
            var t = templateComment(data)
            var wrap = e('.comment-wrap')
            wrap.innerHTML += t
        }
    }
    ajax(request)
}

var templateComment = function(obj) {
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
            <p class="comment-content">${obj.content}</p>
        </div>
    </div>
    `
    return t
}

var insertComment = function(data) {
    var html = ''
    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        var t = templateComment(d)
        html += t
    }
    var wrap = e('.comment-wrap')
    wrap.innerHTML = html
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
