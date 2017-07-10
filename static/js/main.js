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

bindMainBtn()
bindDesignBtn()
bindCommentBtn()
