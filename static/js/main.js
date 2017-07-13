var e = function(sel) {
    return document.querySelector(sel)
}

var es = function(sels) {
    return document.querySelectorAll(sels)
}

var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState === 4 && r.status === 200) {
            reseponseCallback(r.response)
        }
    }
    r.send(data)
}

var bindMainBtn = function() {
    var btn = e('.title')
    btn.addEventListener('click', function() {
        location.pathname = "/"
    })
}

var bindDesignBtn = function() {
    var btn = e('.design')
    btn.addEventListener('click', function(){
        location.pathname = "/design"
    })
}

var bindCommentBtn = function() {
    var btn = e('.comment')
    btn.addEventListener('click', function(){
        ajax('get', '/api/comment/all', '', function(response) {
            var data = JSON.parse(response)
            console.log(data);
            insertComment(data)
        })
    })
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
    var html
    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        var t = templateComment(d)
        html += t
    }
    var wrap = e('.comment-wrap')
    wrap.innerHTML = html
}

bindMainBtn()
bindDesignBtn()
bindCommentBtn()
