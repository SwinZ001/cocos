

cc.Class({
    extends: cc.Component,

    properties: {
        frames:[],
        hero_state:null,
    },

    
    onLoad () {
        if(this.hero_state!="fly"){
            this.hero_state="fly";
            this.heroAmin(this.hero_state);
        };
        

    },
    heroAmin(hero_state){ 
        let heroImage_data=[];
        // switch(hero_state){
        //     case "fly":
        //         heroImage_data=G.role_aros_Data[1].roleaminImage[0].fly;
        //         break;
        //     case "run":
        //         heroImage_data=G.role_aros_Data[1].roleaminImage[0].run;
        //         break;
        //     case "jump":
        //         heroImage_data=G.role_aros_Data[1].roleaminImage[0].jump;
        //         break;
        //     case "fire":
        //         heroImage_data=G.role_aros_Data[1].roleaminImage[0].fire;
        //         break;
        //     case "injured":
        //         heroImage_data=G.role_aros_Data[1].roleaminImage[0].injured;
        //         break;
        // }
        switch(hero_state){         
            case "fly":
                heroImage_data=["juese_fly"];
                break;
            case "run":
                heroImage_data=["juese_run","juese_run2","juese_run3"];
                break;
            case "jump":
                heroImage_data=["juese_jump"];
                break;
            case "fire":
                heroImage_data=["juese_fire"];
                break;
            case "injured":
                heroImage_data=["juese_injured"];
                break;
        }
    // //    加载角色动画图片
    //    this.frames=[];
    //    for(let j=0;j<heroImage_data.length;j++){
    //     cc.assetManager.loadRemote(heroImage_data[j], { ext: '.jpg' }, function (err, texture) {
    //       this.frames[j]=new cc.SpriteFrame(texture);
    //       if(j==heroImage_data.length-1){
    //         let runClip=cc.AnimationClip.createWithSpriteFrames(this.frames,this.frames.length);
    //         runClip.name='runAnim';
    //         runClip.wrapMode=cc.WrapMode.Loop;
    //         let roleAmin=this.node.getComponent(cc.Animation);
    //         roleAmin.addClip(runClip);
    //         var roleAmin_sleep=roleAmin.play('runAnim'); 
    //         roleAmin_sleep.speed=4;
    //       }
            
    //     }.bind(this));
    //   } 
    this.frames=[];
    for(let j=0;j<heroImage_data.length;j++){
        cc.resources.load(heroImage_data[j], cc.SpriteFrame, function (err, SpriteFrame) {
          this.frames[j]=SpriteFrame;
          if(j==heroImage_data.length-1){
            let runClip=cc.AnimationClip.createWithSpriteFrames(this.frames,this.frames.length);
            runClip.name='runAnim';
            runClip.wrapMode=cc.WrapMode.Loop;
            let roleAmin=this.node.getComponent(cc.Animation);
            roleAmin.addClip(runClip);
            var roleAmin_sleep=roleAmin.play('runAnim'); 
            roleAmin_sleep.speed=4;
          }
            
        }.bind(this));
      } 
    },
    


    start () {

    },
    
    update (dt) {

    },
    // onCollisionStay(other,self){
    //     this.heroAmin("run");
    // },
    onCollisionEnter(other,self){
        if(this.hero_state!="run"){
            this.hero_state="run";
            this.heroAmin(this.hero_state);
            console.log(this.hero_state);
        };
        
    },
    // onCollisionExit(other,self){
    //     this.heroAmin("jump");
    // },
   
    
});
