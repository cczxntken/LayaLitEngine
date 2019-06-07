
import GameCore from "../GameCore";
import UIBase from "../ui/UIBase";
import { LE } from "../LitEngine/LE";
import { Managers } from "./BaseManager";
export default class UIManager extends Managers.BaseManager {

    public static Creat(): UIManager {
        var tnode = GameCore.Core.layerUI.addChild(new Laya.Sprite()) as Laya.Sprite;
        tnode.name = "UImanagerNode";
        return new UIManager(tnode);
    }

    public Init() {

    }

    private _uiList: UIBase[] = [];
    public readonly uiPath: string = "UI/";
    public readonly uiLastName: string = ".scene";

    protected constructor(nd: Laya.Node) {
        super(nd, "UIManager");
    }

    private LoadComplete(pName, method: Laya.Handler, pUI) {
        let p = this;
        if (pUI == null) {
            LE.DLog.LogError(pName + " faile.please try again.");
            if (method != null) {
                method.runWith(null);
            }
            return;
        }
        var tui: UIBase = pUI.getComponent(UIBase);
        if (tui == null) {
            console.error("Cant found uibase on " + pName + ".please check your scene.");
        }
        else {
            tui.parent = p._node;
            p._uiList[pName] = tui;
            tui.active = true;
            if (method != null) {
                method.runWith(tui);
            }
        }
    }

    public ShowUI(uiName: string, method?: Laya.Handler) {
        var p = this;
        if (p._uiList[uiName] == null) {
            var tfullpathname = p.uiPath + uiName + p.uiLastName;
            Laya.Scene.load(tfullpathname, Laya.Handler.create(p, p.LoadComplete, [uiName, method]));
        }
        else {
            var tui: UIBase = p._uiList[uiName];
            tui.active = true;
            if (method != null)
                method.runWith(tui);
        }
    }

    public HideUI(uiName: string) {
        var tmgr = this;
        var tui: UIBase = tmgr._uiList[uiName];
        if (tui != null) {
            tui.active = false;
        }
    }

    public GetUI(uiName: string) {
        let p = this;
        let ret: UIBase = p._uiList[uiName];
        return ret;
    }

    public DestoryUI(uiName: string) {
        var tmgr = this;
        var tui: UIBase = tmgr._uiList[uiName];
        if (tui != null) {
            tmgr._uiList[uiName] = null;
            tui.destroyUI();
        }
    }

    public UpdateData() {
        var tlist = this._uiList;
        for (const key in tlist) {
            if (tlist.hasOwnProperty(key)) {
                const element = tlist[key];
                if (element == null || !element.active) continue;
                element.UpdateData();
            }
        }
    }

}