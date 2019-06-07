import UIBase from "./UIBase";
import GameCore from "../GameCore";
import InGameState from "../State/InGameState";

export default class UIMain extends UIBase {
    public  testbutton:Laya.Button;
    
    constructor() { 
        super();
     }


    onAwake():void
    {
       this.testbutton = this.owner.getChildByName("testbutton") as Laya.Button;
        var testcount = 0;
        
        this.testbutton.on(laya.events.Event.CLICK, this, function () { 
            GameCore.mgrState.GotoState(new InGameState(),"1001");
        });
    }
    
    onEnable(): void {

    }

    onDisable(): void {
        
    }
}