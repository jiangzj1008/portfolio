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

var insertDesign = function(data) {
    var main = e('.main')
    main.innerHTML = data
}

var bindDesignBtn = function() {
    var btn = e('.design')
    btn.addEventListener('click', function() {
        ajax('get', '/design', '', insertDesign)
        // location.pathname = "/design"
    })
}

bindDesignBtn()
