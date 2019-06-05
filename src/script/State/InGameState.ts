
import GameCore from "../GameCore";
import BaseScene from "../Scene/BaseScene";
import InGameModule from "../Module/InGameModule";
import { State } from "./StateBase";


export default class InGameState extends State.StateBase {

    constructor() {
        super("InGameState");
    }
    public OnEnter(fun: Laya.Handler,pData?:any) {
        super.OnEnter(fun,pData);
        this._module = new InGameModule(String(pData));
        this._module.Init(Laya.Handler.create(this, this.OnGameLoaded));
    }

    protected OnGameLoaded(obj)  {
        this.OnLoaded();
    }

    public OnExit() {
        super.OnExit();
    }

    protected OnLoaded()  {
        super.OnLoaded();
    }

    public Update(dt: number) {
        super.Update(dt);
    }

    public UpdateData() {
        super.UpdateData();
    }
}