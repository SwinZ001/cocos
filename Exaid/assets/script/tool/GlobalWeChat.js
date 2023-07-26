window.WeChat = {};


//微信注册方法，向服务器注册并返回
WeChat.onRegisterUser = function (_userinfo) {

    wx.cloud.callFunction({
        //云函数名字
        name: "login",
        //上传的授权注册数据
        data: {
            type:'Register',
            db:'user_info',
            userinfo: _userinfo,
        },
        success(res) {
            console.log('Register', res);
            //从服务器获取数据存储
            G.userInfo = res.result.data[0].userinfo;
        },
        //打印异常日志文件
        fail: console.error()
    })
};
    //读取游戏资源
    WeChat.getStartImage = function () {
        //读取游戏图片资源方法
        wx.cloud.callFunction({
        //云函数名字
        name: "login",
        //上传的授权注册数据
        data: {
            type:'getImage',
            db:'gamedata',
        },
        success(res) {
            console.log('getImage', res);
            G.image = res.result.data[0].gameImage[0].Image;
            G.interfaceImage=res.result.data[0].gameImage[0].interfaceImage;
            G.role_aros_Data = res.result.data[0].gameImage[1].role_aros_Data;
            G.aros_role_Data = res.result.data[0].gameImage[1].aros_role_Data;
        },
        //打印异常日志文件
        fail: console.error()
        })
    };

