
var navEvent = {
    home: Home.new(),
    // design: designMain,
    // program: programMain,
    note: Note.new(),
    comment: Comment.new(),
}

var init = function() {
    var hash = location.hash.split('#')[1]
    if (hash == undefined) {
        navEvent['home'].main()
    } else {
        if (hash.indexOf('/') >= 0) {
            var section = hash.split('/')[0]
            console.log(navEvent[section]);
            navEvent[section].main()
        } else {
            navEvent[hash].main()
        }
    }
}

var bindHashChange = function() {
    window.addEventListener('hashchange', function(evt) {
        var hash = location.hash.split('#')[1]
        var section = hash.split('/')[0]
        if (navEvent[section] != undefined) {
            navEvent[section].main()
        }
    })
}

var __main = function() {
    bindHashChange()
    init()
}

__main()
