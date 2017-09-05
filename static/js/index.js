// layui
layui.config({
    version: false, //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
    debug: false, //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
    base: '' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
})

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

layui.use('form', function(){
    var form = layui.form
    form.on('submit(formComment)', function(data){
        navEvent.comment.add(data.field)
        return false
    })
})

__main()
