
import GameCore from "../GameCore";
import UIBase from "../ui/UIBase";
import BaseManager from "./BaseManager";
export default class UIManager extends BaseManager {

    public static Creat(): UIManager {
        var tnode = GameCore.Core.layerUI.addChild(new Laya.Sprite()) as Laya.Sprite;
        tnode.name = "UImanagerNode";
        return new UIManager(tnode);
    }

    private _uiList: UIBase[] = [];
    public readonly uiPath: string = "UI/";
    public readonly uiLastName: string = ".scene";

    protected constructor(nd:Laya.Node)
    {
        super(nd,"UIManager");
    }

    public ShowUI(uiName: string, method?:Laya.Handler) {
        var tmgr = this;
        if (tmgr._uiList[uiName] == null) {
            var tfullpathname = tmgr.uiPath + uiName + tmgr.uiLastName;
            Laya.Scene.load(tfullpathname, Laya.Handler.create(tmgr, function (sc: Laya.Scene) {
                var tui: UIBase = sc.getComponent(UIBase);
                tui.parent = tmgr._node;
                if (tui == null) {
                    console.error("Cant found uibase on " + tfullpathname + ".please check your scene.");
                }
                else {
                    tmgr._uiList[uiName] = tui;
                    tui.active = true;
                    if (method != null)
                        method.run();
                }

            }));
        }
        else {
            var tui: UIBase = tmgr._uiList[uiName];
            tui.active = true;
            if (method != null)
                method.run();
        }
    }

    public HideUI(uiName: string) {
        var tmgr = this;
        var tui: UIBase = tmgr._uiList[uiName];
        if (tui != null) {
            tui.active = false;
        }
    }

    public DestoryUI(uiName: string) {
        var tmgr = this;
        var tui: UIBase = tmgr._uiList[uiName];
        if (tui != null) {
            tmgr._uiList[uiName] = null;
            tui.destroyUI();
        }
    }

    public UpdateData()
    {
        var tlist = this._uiList;
        for (const key in tlist) {
            if (tlist.hasOwnProperty(key)) {
                const element = tlist[key];
                if(element == null || !element.active) continue;
                element.UpdateData();
            }
        }
    }

}