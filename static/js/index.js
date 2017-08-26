var navList = [
    'home',
    'design',
    'program',
    'note',
    'comment',
]

var bindHashChange = function() {
    window.addEventListener('hashchange', function(evt) {
        var hash = location.hash.split('#')[1]
        if (hash == 'note') {
            noteMain()
        }
    })
}

bindHashChange()
