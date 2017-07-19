var noteAll = function() {
    var request = {
        method: 'get',
        url: '/api/note/all',
        contentType: 'application/json',
        callback: function(response) {
            var data = JSON.parse(response)
            console.log(data);
        }
    }
    ajax(request)
}

bindEvent('.note', 'click', noteAll)
