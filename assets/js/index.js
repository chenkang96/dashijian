$(function () {
    //调用 getUserInfo 获取用户的基本信息
    getUserInfo()
    
    //点击 退出 到登录功能
    $('#btnLogout').on('click' ,function () {
        //引入 layer
        var layer=layui.layer;
        layer.confirm('确定退出登录？?', {icon: 3, title:'提示'}, function(index){
            //1.关闭confirm询问框
            layer.close(index);
            //2.清空本地存储的 token
            localStorage.removeItem('token')
            //3.跳转到登录界面
            location.href='/login.html'
            
        });             
    }) 
})

//封装用户的基本信息
function getUserInfo() {
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        //headers 这就是请求头的配置
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            //判断用户信息是否查询成功
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        },complete:function (res) {
            console.log(res);
            //在complete中，可以使用 ree.responseJSON 拿到服务器响应回来玩的数据 
        }
    })
}

//封装用户渲染函数
function renderUser(user) {
    // 1.渲染用户名
    var uname =user.nickname || user.username ;
    $('#welcome').html('欢迎&nbsp;&nbsp;' +uname)
    //2.渲染用户头像
    //判断用户头像信息，如果有就渲染图片，没有渲染文字
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src' ,user.user_pic);
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
}