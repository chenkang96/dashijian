$(function () {
    //从 layui 中获取from对象
    var form =layui.form
    var layer=layui.layer
    form.verify({
        pwd: [[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
    ],

        newPwd: function (value) {
            if ( $('[name=oldPwd]').val() ==value) {
                return '新密码与严密吗不能相同'
            }
        },
        //检验2次判断密码是否一致的规则
        rePwd:function (value) {
            if ( $('[name=newPwd]').val() !=value) {
                return '两次输入的密码不一致'
            }
        }
      });    

      //修改密码 
      $('.layui-form').on('submit', function (e) {
          e.preventDefault()
          $.ajax({
              method:'POSt',
              url:'/my/updatepwd',
              data:$(this).serialize(),
              success:function(res){
                  if (res.status !=0) {
                      return layui.layer.msg(res.message)
                  }else {
                      layui.layer.msg('恭喜您，密码修改成功')
                      $('.layui-form')[0].reset()
                  }
              }
          })
      })
      
})