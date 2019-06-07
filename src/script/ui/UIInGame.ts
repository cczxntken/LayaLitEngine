import UIBase from "./UIBase";
import GameCore from "../GameCore";
import InGameState from "../State/InGameState";
import MainState from "../State/MainState";

export default class UIMain extends UIBase {
    public  backbtn:Laya.Button;
    
    constructor() { 
        super();
     }


    onAwake():void
    {
       this.backbtn = this.owner.getChildByName("backbtn") as Laya.Button;
        this.backbtn.on(laya.events.Event.CLICK, this, function () { 
            GameCore.mgrState.GotoState(new MainState());
        });
    }
}