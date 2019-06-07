
import MainState from "./State/MainState";
import UIManager from "./Managers/UIManager";
import StateManager from "./Managers/StateManager";
import ConfigManager from "./Managers/ConfigManager";
import { LE } from "./LitEngine/LE";
import { Managers } from "./Managers/BaseManager";

export default class GameCore implements IDispose {

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
    public static get Core() {
        if (GameCore._core == null) {
            GameCore._core = new GameCore();
        }
        return GameCore._core;
    }
    //#region layers
    public readonly layerScene: Laya.Sprite;
    public readonly layerUI: Laya.Sprite;
    public readonly layerOver: Laya.Sprite;
    //#endregion

    //#region mgrs
    public static get mgrUI(): UIManager {
        return GameCore.Core.mgrList["UIManager"];
    }

    public static get mgrConfig(): ConfigManager {
        return GameCore.Core.mgrList["ConfigManager"];
    }

    public static get mgrState(): StateManager {
        return GameCore.Core.mgrList["StateManager"];
    }

    private mgrList: Managers.BaseManager[] = [];
    private updateList: Managers.BaseManager[] = [];
    private _dataUpdateTimer = 0;
    private isRuning = false;
    //#endregion

    //#endregion  
    //#region 方法
    // "showall"
    private constructor() {
        GameCore._core = this;
        Laya.stage.frameLoop(1, this, this.Update);
        this.layerScene = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;//可見最底层
        this.layerUI = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
        this.layerOver = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;

        this.AddMgr(ConfigManager.Creat(), false);
        this.AddMgr(UIManager.Creat());
        this.AddMgr(StateManager.Creat());
    }

    public static Init() {
        if (GameCore._core != null) return;
        let tcore = GameCore.Core;
        GameCore.mgrConfig.LoadConfig(Laya.Handler.create(tcore, tcore.OnConfigLoaded));
    }

    public static DestroyCore() {
        if (GameCore._core != null) {
            GameCore._core.Destroy();
            GameCore._core = null;
        }
    }

    private AddMgr(pMgr: Managers.BaseManager, pUpdate: boolean = true)  {
        let g = this;
        g.mgrList[pMgr.managerName] = pMgr;
        if (pUpdate) {
            g.updateList.push(pMgr);
        }
    }

    protected OnConfigLoaded()  {
        let p = this;
        for (let i = 0; i < p.mgrList.length; i++) {
            const e = p.mgrList[i];
            e.Init();
        }
        GameCore.mgrState.GotoState(new MainState());
        p.isRuning = true;
    }

    Destroy() {
        let p = this;
        Laya.stage.clearTimer(this, this.Update);
        p.layerScene.destroy();
        p.layerUI.destroy();
        p.layerOver.destroy();
    }

    Update() {
        let p = this;
        if (!p.isRuning) return;
        let dt = Math.min(Laya.timer.delta * 0.001, 0.5);

        let tinterval = GameCore.dataUpdateInterval;
        let topentry = GameCore.openTryCache;
        let ttimer = p._dataUpdateTimer + dt;
        let tisUpdateData = false;
        if (ttimer >= tinterval) {
            tisUpdateData = true;
            p._dataUpdateTimer = ttimer;
        }

        var tlist = this.mgrList;

        for (let index = 0; index < tlist.length; index++) {
            const element = tlist[index];
            if (topentry) {
                try {
                    p.UpdateElement(element, dt, tisUpdateData);
                } catch (error) {
                    console.error(element.managerName + "---" + error);
                }
            }
            else {
                p.UpdateElement(element, dt, tisUpdateData);
            }

        }
    }

    private UpdateElement(e: Managers.BaseManager, dt: number, isUpdateData: boolean) {
        e.Update(dt);
        if (isUpdateData)
            e.UpdateData();
    }
    //#endregion
}