//配置通用
fis.set('project.files', ['src/**']);
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'release/**', 'README.md' , 'local/**' ,'.git/**', 'fis-conf.js']);
fis.set('charset', 'utf-8');
fis.set('project.charset', 'utf-8');

fis.match('**.less', {
    parser: fis.plugin('less'), // invoke `fis-parser-less`,
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['> 1%'],
        cascade: true
    }),
    rExt: '.css'
});

fis.match(/^\/src\/js\/(app|common)\/(.*\.js)$/i, {
    parser: fis.plugin('babel'),
    postprocessor : fis.plugin('replace',{
        local_cdn : "http://127.0.0.1:8080",
        debug : "local"
    })
});

fis.match(/^\/src\/(.*)$/i,{
    release : "$1",
    useCache : false
});

fis.match(/^\/src\/css\/_.*\.(css|less)/i,{
    release : false
});

fis.match(/^\/src\/.*\/(_.*)$/i,{
    release : "temp_file/$1"
});

//配置本地打包
fis.hook('relative');
fis.media('local')
    .match('**', {
        relative: true,
        charset : fis.get('charset'),
        deploy: fis.plugin('encoding')
    })
    .match('**', {
        deploy: [fis.plugin('encoding'),fis.plugin('local-deliver', {
            to: './local'
        })]
    })
