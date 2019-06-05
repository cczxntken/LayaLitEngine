export default class UIBase extends Laya.Script {

    protected _parent :Laya.Node;
    public get parent()
    {
        return this._parent;
    }
    
    public set parent(value:Laya.Node)
    {
        this._parent = value;
    }

    protected _active :boolean = false;

    public get active()
    {
        return this._active;
    }

    public set active(value : boolean)
    {
        this._active = value;
        if (!value)
        {
            this.owner.removeSelf();
        }
        else
        {
            if(this.parent != null)
                this.parent.addChild(this.owner);
        } 
    }

    constructor() { 
        super(); 
    }

    public get nodeScene() : Laya.Scene{
        return this.owner as Laya.Scene;
    }
    
    public destroyUI()
    {
        this.owner.destroy();
    }

    public UpdateData()
    {

    }
}
