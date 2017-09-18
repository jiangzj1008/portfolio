
var navEvent = {
    home: Home.new(),
    // design: designMain,
    // program: programMain,
    note: Note.new(),
    comment: Comment.new(),
}

var init = function() {
    var hash = location.hash.split('#')[1]
    // no hash
    if (hash == '') {
        navEvent['home'].main()
        return
    }
    // has hash
    var data = hash.split('/')
    var section = data[0]
    if (!navEvent[section]) {
        return
    }
    if (section == 'note' && data[1]) {
        var id = data[1]
        navEvent['note'].article(id)
    } else {
        navEvent[section].main()
    }
}

var bindHashChange = function() {
    window.addEventListener('hashchange', function(evt) {
        var hash = location.hash.split('#')[1]
        // no hash
        if (hash == '') {
            navEvent['home'].main()
            return
        }
        // has hash
        var data = hash.split('/')
        var section = data[0]
        if (!navEvent[section]) {
            return
        }
        if (section == 'note' && data[1]) {
            var id = data[1]
            navEvent['note'].article(id)
        } else {
            navEvent[section].main()
        }
    })
}

var __main = function() {
    bindHashChange()
    init()
}

__main()
