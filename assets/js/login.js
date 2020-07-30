//入口函数
$(function () {
    //点击按钮，切换登录和注册界面
    $("#link_reg").on('click' ,function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $("#link_login").on('click' ,function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    //从 layui 中获取from对象
    var form =layui.form
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        },
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        //检验2次判断密码是否一致的规则
        repwd:function (value) {
            if ( $('#reg-pwd').val() !=value) {
                return '两次密码不一致'
            }
        }
      });    
      
    //监听注册表单的提交事件
    var layer =layui.layer
    $('#form_reg').on('submit', function (e) {
    //阻止表单的默认提交
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/api/reguser',
        data:{
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        },
        success:function(res){
            //注册失败校验
            if (res.status !=0) {
                // return alert(res.message)
                return layer.msg(res.message);
            }
            //注册成功提示
            layer.msg('注册成功，请登录');
            //清空表单
            $('#form_reg')[0].reset()
            //模拟人的点击行为
            $('#link_login').click()
        }
    })
    })

      //监听登录表单的提交事件
      $('#form_login').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !==0) {
                    return layer.msg(res.message);
                }
                //登录成功
                layer.msg('登录成功');
                //将登录成功得到的字符串保存在localStorage中
                localStorage.setItem('token' ,res.token)
                //跳转到后台主页
                location.href='index.html'
            }
        })
      })
})