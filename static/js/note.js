var noteAll = function() {
    var request = {
        method: 'get',
        url: '/api/note/all',
        contentType: 'application/json',
        callback: function(response) {
            var data = JSON.parse(response)
            displayItem('.note-container')
            var wrap = e('.note-wrap')
            wrap.innerHTML = ''
            noteInsert(data)
        }
    }
    ajax(request)
}


var noteVerify = function() {
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

var noteAdd = function() {
    var form = noteVerify()
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
            alert('成功')
        }
    }
    ajax(request)
}

var noteTemplate = function(obj) {
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

var noteInsert = function(arr) {
    var html = ''
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i]
        var t = noteTemplate(data)
        html += t
    }
    var wrap = e('.note-wrap')
    wrap.innerHTML += html
}

bindEvent('.note', 'click', noteAll)
bindEvent('.submit', 'click', noteAdd)
