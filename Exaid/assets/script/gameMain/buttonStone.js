

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {
        cc.director.getPhysicsManager().enabled=false;
        this.node.y=-cc.winSize.height/2+this.node.height/2;
    },

    start () {

    },

   

    update (dt) {
        this.node.x=this.node.x-5;                 
        if(this.node.x<-cc.winSize.width/2-this.node.width/2){
            cc.director.getPhysicsManager().enabled=true;
            this.node.x=cc.winSize.width/2+this.node.width/2+this.node.width;
        }
    }
});
