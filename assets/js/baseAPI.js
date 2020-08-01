//设置路径(测试)
var baseURl ="http://ajax.frontend.itheima.net"
//设置路径(生产)
// var baseURl ="http://www.itheima.com"

//拦截/过滤每一次Ajax请求，配置每次请求需要的参数
$.ajaxPrefilter( function( options ) {
    options.url=baseURl+options.url

    //判断请求路径是否包含 /my/
    if (options.url.indexOf('/my') != -1) {
      options.headers={
        Authorization:localStorage.getItem('token') || ''
      }
  
    }

    //全局统一挂载 complete 回调函数
    options.complete = function (res) {
      var data =res.responseJSON
      if (data.status == 1 && data.message =='身份认证失败！') {
      //1.清空本地的 tokrn
      localStorage.removeItem('token')
      //2.跳转到登录页面
      location.href = '/login.html'
      }
    
    }
});