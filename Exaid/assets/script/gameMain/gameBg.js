

cc.Class({
    extends: cc.Component,

    properties: {
        bgs:[cc.Node],
        buttom:[cc.Node]
    },



    onLoad () {
        cc.director.getPhysicsManager().enabled=false;
        this.bgs[0].width=cc.winSize.width;
        this.bgs[0].height=cc.winSize.height;
        this.bgs[1].width=cc.winSize.width;
        this.bgs[1].height=cc.winSize.height;
        this.bgs[0].x=0;
        this.bgs[1].x=this.bgs[0].x+this.bgs[0].width;

        this.buttom[0].width=this.bgs[0].width;
        this.buttom[0].height=cc.winSize.height/10;
        this.buttom[1].width=this.bgs[1].width;
        this.buttom[1].height=cc.winSize.height/10;
        this.buttom[0].x=this.bgs[0].x;
        this.buttom[0].y=-cc.winSize.height/2+this.buttom[0].height/2;
        this.buttom[1].x=this.bgs[0].x+this.buttom[1].width;
        this.buttom[1].y=-cc.winSize.height/2+this.buttom[0].height/2;
    },

    start () {

    },
    
    bgMove(){
        this.bgs[0].x=this.bgs[0].x-5;
        this.bgs[1].x=this.bgs[1].x-5;
        this.buttom[0].x=this.bgs[0].x;
        this.buttom[1].x=this.bgs[1].x;
        if(this.bgs[0].x<=-this.bgs[0].width){
            cc.director.getPhysicsManager().enabled=true;
            this.bgs[0].x=this.bgs[1].x+this.bgs[0].width;
        }
        if(this.bgs[1].x<=-this.bgs[0].width){
            this.bgs[1].x=this.bgs[0].x+this.bgs[0].width;
      
        }
    },

    update (dt) {
        //背景移动
        this.bgMove();
        
        
        
    },

 
});
