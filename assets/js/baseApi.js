//设置路径(测试)
var baseURl ="http://ajax.frontend.itheima.net"
//设置路径(生产)
// var baseURl ="http://www.itheima.com"

//拦截/过滤每一次Ajax请求，配置每次请求需要的参数
$.ajaxPrefilter( function( options ) {
    console.log(options);
    options.url=baseURl+options.url

  });