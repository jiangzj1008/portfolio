var e = function(sel) {
    return document.querySelector(sel)
}

var es = function(sels) {
    return document.querySelectorAll(sels)
}

var bindEvent = function(sel, evt, func) {
    var ele = e(sel)
    if (ele) {
        ele.addEventListener(evt, func)
    }
}

var ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var displayItem = function(sel) {
    var items = es('.item-container')
    var target = e(sel)
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.classList.contains('show')) {
            item.classList.remove('show')
        }
    }
    target.classList.add('show')
}
