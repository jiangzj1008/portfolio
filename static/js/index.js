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
        console.log(navEvent[hash]);
        navEvent[hash].main()
    }
}

var bindHashChange = function() {
    window.addEventListener('hashchange', function(evt) {
        var hash = location.hash.split('#')[1]
        if (navEvent[hash] != undefined) {
            navEvent[hash].main()
        }
    })
}

var __main = function() {
    bindHashChange()
    init()
}

__main()
