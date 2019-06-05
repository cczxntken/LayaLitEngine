
import GameCore from "../GameCore";

export default class UpdateManager extends Laya.Script{
    public static Creat(): UpdateManager {
        var tnode = GameCore.Core.layerLogic.addChild(new Laya.Node());
        tnode.name = "UpdateManagerNode";
        var ret: UpdateManager = tnode.addComponent(UpdateManager);
        return ret;
    }

    private updataFunList:UpdateObject[]=[];
    

    onUpdate()
    {
        var dt =  Laya.timer.delta;
        var tuplist = this.updataFunList;
        for (const iterator of tuplist) {
            iterator.CallMethod(dt);
        }
    }

    onLateUpdate()
    {
        
    }
    
}


export class UpdateObject{
    private _method:((dt:number)=>void);
    constructor(met:((dt:number)=>void)){
        this._method = met;
    }
    public CallMethod(dt:number)
    {
        var tmethod = this._method;
        if(tmethod!=null)
            tmethod(dt);
    }
}