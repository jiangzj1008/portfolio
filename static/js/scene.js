class Page {
    constructor(name) {
        this.page = name
        this.container = e('#main')
    }
    static new(name) {
        var i = new this(name)
        return i
    }
    main() {
        var self = this
        var name = self.page
        var request = {
            method: 'get',
            url: `/api/${name}/main`,
            callback: function(response) {
                var wrap = self.container
                wrap.innerHTML = response
                if (self.all) {
                    self.all()
                }
            }
        }
        ajax(request)
    }
}
