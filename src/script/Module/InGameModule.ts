
export default class InGameModule implements GameModuleBase {
    private _callBackHandle:Laya.Handler;
    constructor(pScName: string) {

    }
    public GetScene(){

    }
    //#region init
    public Init(fun: Laya.Handler) {//addShaderPass
     
    }

    protected OnAssetsPreLoaded(event) {

    }

    protected OnUILoaded() {

        this.Run();
    }
    //#endregion
   
    //#region running
    public Run() {
     }
    public Pause() { }
    public Resume() { }
    public Destroy() {
    }

    //#endregion
   
    //#region update
    public Update(dt: number) {

    }

    public UpdateData() {

    }
    //#endregion

    //#region call
    //#endregion
   

    public ModuleEvent(pEventData)
    {

    }
}