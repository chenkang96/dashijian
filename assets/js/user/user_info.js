$(function () {
    //定义校验规则
    var form =layui.form
    var layer =layui.layer
    form.verify({
        nickname:function (value) {
            if (value.length >6) {
                return "昵称应该输入1~6位之间"
            }
        }
    })

    initUserInfo()

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                // console.log(res);
                // console.log(res.data);
                // 获取用户信息校验
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //展示用户信息
                form.val('formUserInfo' ,res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click' ,function (e) {
        //取消浏览器的默认重置操作行为
        e.preventDefault()
        initUserInfo()
    })




    //监听表单的提交事件
    $('.layui-form').on('submit' ,function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if (res.status !=0) {
                    return layer.msg('用户信息修改失败')
                }else {
                    layer.msg('恭喜您，用户信息修改成功')
                    //刷新父框架的用户信息
                    window.parent.getUserInfo()
                }
            }
        })
    })

})