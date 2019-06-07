
import { LE } from "../LitEngine/LE";
import { Managers } from "./BaseManager";

export default class ConfigManager extends Managers.BaseManager {
    public static Creat(): ConfigManager {
        return new ConfigManager();
    }

    public Init() {

    }

    private _loadCall: Laya.Handler;

    private _configList: any[] = [];
    private _cfgListObj: any;
    private constructor()  {
        super(null, "ConfigManager");
    }

    public LoadConfig(pHandle: Laya.Handler)  {
        this._loadCall = pHandle;
        LE.AssetLoader.Load("resources/Config/ConfigList.json",Laya.Handler.create(this, this.OnListLoaded));
    }

    protected OnListLoaded(pListobj)  {
        this._cfgListObj = pListobj;
        var assets: string[] = [];
        var tlist = this._cfgListObj.configList;
        for (let index = 0; index < tlist.length; index++) {
            assets.push(tlist[index].filePath);
        }
        LE.AssetLoader.Load(assets, Laya.Handler.create(this, this.OnCfgLoaded));
    }

    protected OnCfgLoaded()  {
        let tcfglist = this._configList;
        let tlist = this._cfgListObj.configList;
        for (let index = 0; index < tlist.length; index++) {
            const elment = tlist[index];
            let tcfg = Laya.Loader.getRes(elment.filePath);
            tcfglist[elment.key] = tcfg;
        }

        if (this._loadCall != null)
            this._loadCall.run();

    }

    public GetConfig(key:string)
    {
        let tcfglist = this._configList;
        if(tcfglist[key] == null)
        {
            console.error("Cant not found config.key = " + key);
            return null;
        }
        return tcfglist[key];
    }

}