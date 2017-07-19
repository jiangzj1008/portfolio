var bindIndexEvent = function() {
    bindEvent('.title', 'click', function() {
        location.pathname = "/"
    })
}

bindIndexEvent()
