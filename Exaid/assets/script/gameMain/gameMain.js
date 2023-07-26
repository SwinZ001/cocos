

cc.Class({
    extends: cc.Component,

    properties: {
        hero:cc.Node,

    },


    onLoad () {
        cc.director.getPhysicsManager().enabled=true;//必须先初始化为true,才能在后面修改true还是false
        cc.director.getCollisionManager().enabled=true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;

        this.hero_script=this.hero.getComponent("gameHero");

        
    },

    start () {

    },

    update (dt) {
     
       
        
        
    },

    state_onclick(event,str){
            switch(str){
                case "jump":
                    if(this.hero_script.hero_state!="jump"){
                        this.hero_script.hero_state="jump";
                        this.hero_script.heroAmin(this.hero_script.hero_state);
                    };
                    
                    // this.hero_script.heroAmin("jump");
                    let lv=this.hero.getComponent(cc.RigidBody).linearVelocity;
                    lv.y+=400;
                    this.hero.getComponent(cc.RigidBody).linearVelocity=lv;
                    break;
                case "fire":
                    if(this.hero_script.hero_state!="fire"){
                        this.hero_script.hero_state="fire";
                        this.hero_script.heroAmin(this.hero_script.hero_state);
                    };
                    // this.hero_script.heroAmin("fire");
                    break;
            }
       
        
        
    
   },


});
