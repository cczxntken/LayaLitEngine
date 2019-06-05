import GameCore from "../GameCore";

export default abstract  class BaseScene implements IDispose,IUpdate,IRuning {

    protected _name: string;
    public get Name() {
        return this._name;
    }
    protected _data:any;
    public get data(){
        return this._data;
    }
    protected _scene:Laya.Sprite3D;
    public get scene():Laya.Sprite3D
    {
        return this._scene;
    }
    constructor(pName:string) {
        let s = this;
        let c = GameCore.Core.mgrConfig.GetConfig("SceneConfig");
        s._data = c[pName];
        s._name = s.data.name;  
    }

    public Creat() {
       
    }

    public PushResArray(pAssets: any[])
    {
       
    }

    abstract Update(dt:number);
    abstract UpdateData();
    abstract Run();
    abstract Pause();
    abstract Resume();

    public Destroy() {
        if (this._scene != null)
            this._scene.destroy();
    }
}