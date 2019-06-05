
import GameCore from "../GameCore";
import { State } from "./StateBase";
export default class MainState extends State.StateBase {
    constructor() {
        super("MainState");
    }
    public OnEnter(fun: Laya.Handler,pData?:any) {
        super.OnEnter(fun,pData);

        GameCore.Core.mgrUI.ShowUI("UIMain", Laya.Handler.create(this, function () {
            this.OnLoaded();
        }));
    }

    public OnExit() {
        GameCore.Core.mgrUI.DestoryUI("UIMain");
        super.OnExit();
    }

    protected OnLoaded()  {
        super.OnLoaded();
    }

}