

cc.Class({
    extends: cc.Component,

    properties: {
       progressBar:cc.Node,
       gamestartText: cc.Node,
       userhead:cc.Node,
       username:cc.Node,
       buttonLayout:cc.Node,
       button:cc.Prefab,
       interfaceImage:[cc.Node],
       buttonshow:[cc.Node],
       buttons:[cc.Node],
       roleImage:cc.Node,
       roleName:cc.Node,
       roleMoney:cc.Node,
       roleamin:cc.Node,
       rolecoin:cc.Node,
       defensiveNum:cc.Node,
       arosImage:cc.Node,
       arosName:cc.Node,
       arosMoney:cc.Node,
       aroscoin:cc.Node,
       powerNum:cc.Node,
       frames:[],
       role_p:0,
       aros_p:0,
    },

 
    start () {

    },


    onLoad () {
        this._urls=G.image;
        //进度条
        this.resource = null;
        this.progressBar.getComponent(cc.ProgressBar).progress=0;
        this._clearAll();
        cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
        },
   

    update (dt) {
      if(!this.resource){
        return ;
    }
    var progress = this.progressBar.getComponent(cc.ProgressBar).progress;
    if(progress >= 1){
        console.log('加载完成')
        //加载完成隐藏进度条
        this.progressBar.active = false;
        //显示开始界面
        this.interfaceImage[0].active = true;
        //加载开始界面图片
        this.getinterfaceImage(0);
        //调用微信授权
        this.weChatEmpower();
        this.enabled = false;
        return ;
    }

    if(progress < this.progressBar.getComponent(cc.ProgressBar).progress){
        progress += dt;
    }

    this.progressBar.getComponent(cc.ProgressBar).progress = progress;

    },

    _clearAll: function() {
      for(var i = 0; i < this._urls.length; ++i) {
          var url = this._urls[i];
          cc.loader.release(url);
      }
  },
    _progressCallback: function(completeCount, totalCount, res) {
      //加载进度回调
      console.log('第 ' + completeCount + '加载完成！');
      this.progressBar.getComponent(cc.ProgressBar).progress = completeCount / totalCount;
      this.resource = res;
      this.completeCount = completeCount;
      this.totalCount = totalCount;
  },

    _completeCallback: function(err, texture) {
        //加载完成回调
    },



   
    //加载界面图片
    getinterfaceImage(bg_i){
        let i=bg_i;
        switch(i){
          case 0:
            cc.assetManager.loadRemote(G.interfaceImage[i], { ext: '.jpg' }, function (err, texture) {
              var interfaceImage = new cc.SpriteFrame(texture);
              this.interfaceImage[i].getComponent(cc.Sprite).spriteFrame = interfaceImage;
            }.bind(this));
            break;
          case 1:
            for(let j=i;j<this.interfaceImage.length;j++){
              cc.assetManager.loadRemote(G.interfaceImage[j], { ext: '.jpg' }, function (err, texture) {
                var interfaceImage = new cc.SpriteFrame(texture);
                this.interfaceImage[j].getComponent(cc.Sprite).spriteFrame = interfaceImage;                     
              }.bind(this));
            }
            break;

        } 
    },
    //加载头像图片
    getUserheadImage(){
      cc.assetManager.loadRemote(G.userInfo.avatarUrl, { ext: '.jpg' }, function (err, texture) {
            var userhead = new cc.SpriteFrame(texture);
            this. userhead.getComponent(cc.Sprite).spriteFrame = userhead;   
            this.username.getComponent(cc.Label).string=G.userInfo.nickName;                    
      }.bind(this));
  },

//循环遍历添加按钮
    newButton(){
        for(let i=0;i<=4;i++){
            var image_i=2+i;
            cc.assetManager.loadRemote(G.image[image_i].url, { ext: '.jpg' }, function (err, texture) {
                var button_image = new cc.SpriteFrame(texture);
                var button_item=cc.instantiate(this.button);
                button_item.getComponent(cc.Sprite).spriteFrame=button_image;
                //按钮监听事件
                var button=button_item.getComponent(cc.Button);//获取按钮上的按钮组件
                var targetEvent=new cc.Component.EventHandler();
                targetEvent.target=this.node;
                targetEvent.component="gameMenu";
                targetEvent.handler="menuButtonOnclick";
                targetEvent.customEventData=i;
                button.clickEvents.push(targetEvent);
                this.buttonLayout.addChild(button_item); 
                this.buttons[i]=button_item; 
            }.bind(this));     
        }
        
    },
    //菜单按钮监听事件
    menuButtonOnclick:function(event,str){
        console.log(str);
        for(let i=0;i<=4;i++){
          this.buttonshow[i].active=false;
          this.buttons[i].setScale(1.8,0.7);
        }
        this.buttonshow[str].active=true;
        this.buttons[str].setScale(2,0.9);
        switch(str){
          case 2:
            this.get_Role_Aros_Data(this.role_p,1);
            break;
          case 3:
            this.get_Role_Aros_Data(this.aros_p,2);
            break;
        }           

    },
    //角色武器左右选择按钮
    role_aros_Onclick(event,str){
      switch(str){
        case "left":
          this.role_p--;
          if(this.role_p<0){
            this.role_p=G.role_aros_Data.length-1;
          }
          this.get_Role_Aros_Data(this.role_p,1);          
          break;
        case "right":
          this.role_p++;
          if(this.role_p>G.role_aros_Data.length-1){
            this.role_p=0;
          }
          this.get_Role_Aros_Data(this.role_p,1);
          break;
          case "top":
          this.aros_p--;
          if(this.aros_p<0){
            this.aros_p=G.aros_role_Data.length-1;
          }
          this.get_Role_Aros_Data(this.aros_p,2);
            break;
          case "buttom":
          this.aros_p++;
          if(this.aros_p>G.aros_role_Data.length-1){
            this.aros_p=0;
          }
          this.get_Role_Aros_Data(this.aros_p,2);
            break;
          case "start":
            cc.director.loadScene("gameMain");
            break;
      }
       
    },
    
    //角色武器选择信息
    get_Role_Aros_Data(p,p2){
      let i=p;
      switch(p2){
        case 1:
          var roleImage_Data=G.role_aros_Data[i].roleImage;
          var roleName_Data=G.role_aros_Data[i].roleName;
          var roleMoney_Data=G.role_aros_Data[i].roleMoney;
          var roleCoin_Data=G.role_aros_Data[i].coin;
          var roleAminImage_data=G.role_aros_Data[i].roleaminImage[0].run;
          var defensive_data=G.role_aros_Data[i].defensive;
          //加载角色图标
          cc.assetManager.loadRemote(roleImage_Data, { ext: '.jpg' }, function (err, texture) {
            var roleTexture = new cc.SpriteFrame(texture);
            this.roleImage.getComponent(cc.Sprite).spriteFrame = roleTexture;
            this.roleName.getComponent(cc.Label).string=roleName_Data;
            this.roleMoney.getComponent(cc.Label).string=roleMoney_Data;
            this.defensiveNum.getComponent(cc.Label).string=defensive_data;
          }.bind(this));
           //加载金钱图标
           cc.assetManager.loadRemote(roleCoin_Data, { ext: '.jpg' }, function (err, texture) {
            var coinTexture = new cc.SpriteFrame(texture);
            this.rolecoin.getComponent(cc.Sprite).spriteFrame =coinTexture;
          }.bind(this));
           //加载角色动画图片
           for(let j=0;j<roleAminImage_data.length;j++){
            cc.assetManager.loadRemote(roleAminImage_data[j], { ext: '.jpg' }, function (err, texture) {
              this.frames[j]=new cc.SpriteFrame(texture);
              if(j==roleAminImage_data.length-1){
                let runClip=cc.AnimationClip.createWithSpriteFrames(this.frames,this.frames.length);
                runClip.name='runAnim';
                runClip.wrapMode=cc.WrapMode.Loop;
                let roleAmin=this.roleamin.getComponent(cc.Animation);
                roleAmin.addClip(runClip);
                roleAmin.play('runAnim'); 
              }
                
            }.bind(this));
          }  
          break;
        case 2:
          var arosImage_Data=G.aros_role_Data[i].arsoImage;
          var arosName_Data=G.aros_role_Data[i].arsoName;
          var arosMoney_Data=G.aros_role_Data[i].arsoMoney;
          var arosCoin_Data=G.aros_role_Data[i].coin;
          var power_Data=G.aros_role_Data[i].power;
          //加载武器图片
          cc.assetManager.loadRemote(arosImage_Data, { ext: '.jpg' }, function (err, texture) {
            var arosTexture = new cc.SpriteFrame(texture);
            this.arosImage.getComponent(cc.Sprite).spriteFrame = arosTexture;
            this.arosName.getComponent(cc.Label).string=arosName_Data;
            this.arosMoney.getComponent(cc.Label).string=arosMoney_Data;
            this.powerNum.getComponent(cc.Label).string=power_Data;
          }.bind(this)); 
           //加载金钱图标
           cc.assetManager.loadRemote(arosCoin_Data, { ext: '.jpg' }, function (err, texture) {
            var coinTexture = new cc.SpriteFrame(texture);
            this.aroscoin.getComponent(cc.Sprite).spriteFrame =coinTexture;
          }.bind(this));
          break;
      }
     
    },


      //微信授权
      weChatEmpower() {
        var self = this;
        wx.login({
        success: function (res) {
            if (res.code) {
                console.log("232323" + res.code);
            }
            var button = wx.createUserInfoButton({
              text:'',
                style: {
                  left: 0,
                  top: 0,
                  width: wx.getSystemInfoSync().screenWidth,
                  height: wx.getSystemInfoSync().screenHeight,             
                }
            });
            button.show();
              button.onTap((res) => {
                button.destroy();
                  //判断是否微信授权成功
                  if (res.errMsg === "getUserInfo:ok") {
                    self.gamestartText.getComponent(cc.Label).string="即将进入游戏";
                      console.log("授权成功");
                      //调用微信注册方法，传入授权的用户信息进行服务器注册
                      let i=0;
                      self.schedule(function(){
                        if(i<2){ 
                          WeChat.onRegisterUser(res.userInfo);
                          i++;
                          return;
                        }else{
                          self.gamestartText.active=false;
                          //显示菜单界面
                          self.interfaceImage[1].active=true;
                          self.getinterfaceImage(1);
                          self.newButton();
                          self.getUserheadImage();
                           
                        }
                        
                        
                      },1,2,0);
                                                          
                  } else {
                      console.log("授权失败");
                  }
              })
            
        },

        }); 
    
},
    
    
});

