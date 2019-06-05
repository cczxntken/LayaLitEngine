
import MainState from "./State/MainState";
import UIManager from "./Managers/UIManager";
import StateManager from "./Managers/StateManager";
import BaseManager from "./Managers/BaseManager";
import ConfigManager from "./Managers/ConfigManager";

export default class GameCore extends Laya.Script {
    //#region config
    /**
 * <p>缩放模式。默认值为 "noscale"。</p>
 * <p><ul>取值范围：
 * <li>"noscale" ：不缩放；</li>
 * <li>"exactfit" ：全屏不等比缩放；</li>
 * <li>"showall" ：最小比例缩放；</li>
 * <li>"noborder" ：最大比例缩放；</li>
 * <li>"full" ：不缩放，stage的宽高等于屏幕宽高；</li>
 * <li>"fixedwidth" ：宽度不变，高度根据屏幕比缩放；</li>
 * <li>"fixedheight" ：高度不变，宽度根据屏幕比缩放；</li>
 * <li>"fixedauto" ：根据宽高比，自动选择使用fixedwidth或fixedheight；</li>
 * </ul></p>
 */
    static width: number = 720;
    static height: number = 1280;
    static scaleMode: string = "showall";
    static screenMode: string = "none";
    static alignV: string = "center";
    static alignH: string = "middle";
    static startScene: any = "GameStart.scene";
    static sceneRoot: string = "";
    static debug: boolean = false;
    static stat: boolean = true;
    static physicsDebug: boolean = false;
    static exportSceneToJson: boolean = true;
    static dataUpdateInterval = 0.2;
    static openTryCache = false;
    //#endregion
    //#region core核心组件
    private static _core: GameCore = null;
    public static get Core()  {
        if (GameCore._core == null)  {
            let tnode = Laya.stage.addChild(new Laya.Node()) as Laya.Node;
            let tsc = tnode.addComponent(GameCore);
        }
        return GameCore._core;
    }
    //#region layers
    public readonly layerLogic: Laya.Node;
    public readonly layerScene: Laya.Sprite;
    public readonly layerUI: Laya.Sprite;
    public readonly layerOver: Laya.Sprite;

    //#endregion

    //#region mgrs
    public readonly mgrUI:UIManager;
    public readonly mgrState:StateManager;
    public readonly mgrConfig:ConfigManager;


    private _mgrList: BaseManager[] = [];
    private _dataUpdateTimer = 0;
    //#endregion

    //#endregion  
    //#region 方法
    // "showall"
    private constructor() {
        super();
        GameCore._core = this;

        this.layerLogic = Laya.stage.addChild(new Laya.Node()) as Laya.Node;
        this.layerScene = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;//可見最底层
        this.layerUI = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
        this.layerOver = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;

        this.mgrUI = UIManager.Creat();
        this.mgrState = StateManager.Creat();
        this.mgrConfig = ConfigManager.Creat();

        this._mgrList.push(this.mgrUI);
        this._mgrList.push(this.mgrState);

      

        this.mgrConfig.LoadConfig(Laya.Handler.create(this,this.OnConfigLoaded));
    }

    public static Init() {
        if (GameCore._core != null) return;
        GameCore.Core;
    }
    

    public static DestroyCore() {
        if (GameCore._core != null) {
            GameCore._core.destroy();
            GameCore._core = null;
        }
    }

    protected OnConfigLoaded()
    {
		this.mgrState.GotoState(new MainState());
    }

    public destroy() {
        this.layerLogic.destroy();
        this.layerScene.destroy();
        this.layerUI.destroy();
        this.layerOver.destroy();
        super.destroy();
    }
    
    onUpdate ()  {
        let dt = Math.min(Laya.timer.delta * 0.001,0.5) ;

        let self = this;
        let tinterval = GameCore.dataUpdateInterval;
        let topentry = GameCore.openTryCache;
        let ttimer = self._dataUpdateTimer + dt;    
        let tisUpdateData = false;
        if (ttimer >= tinterval)  {
            tisUpdateData = true;
            self._dataUpdateTimer = ttimer;
        }

        var tlist = this._mgrList;

        for (let index = 0; index < tlist.length; index++) {
            const element = tlist[index];
            if(topentry)
            {
               try {
                self.UpdateElement(element,dt,tisUpdateData);
               } catch (error) {
                   console.error(element.managerName + "---"+error);
               }
            }
            else
            {
                self.UpdateElement(element,dt,tisUpdateData);
            }
            
        }
    }

    private UpdateElement(element:BaseManager,dt:number,isUpdateData:boolean)
    {
        element.Update(dt);
        if (isUpdateData)
            element.UpdateData();
    }
    //#endregion
}