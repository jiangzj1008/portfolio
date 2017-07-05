var fs = require('fs')

var blogFilePath = 'db/blog.json'

// 用 对象 来存储 Blog 的数据
const ModelBlog = function(form) {
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    this.created_time = Math.floor(new Date() / 1000)
}

// 读取 数据库
const loadBlogs = function() {
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}
