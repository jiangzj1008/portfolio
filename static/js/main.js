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
        })
    })
}

// 留言板
var templateComment = function(obj) {
    var t = `
        <div class="comment-item">
            <img src="" alt="">
            <div class="comment-detail">
                <p class="comment-author">
                    北顾
                    <span class="comment-time">2017-07-11, 17:35</span>
                </p>
                <p class="comment-content">hello!</p>
            </div>
        </div>
    `
}
var insertComment = function() {

}

bindMainBtn()
bindDesignBtn()
bindCommentBtn()
