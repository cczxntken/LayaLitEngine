/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module game.ui {
    export class GameStartUI extends Scene {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("GameStart");
        }
    }
    REG("game.ui.GameStartUI",GameStartUI);
}
export module game.ui.test {
    export class TestSceneUI extends Scene {
		public testScene_btn:Laya.Button;
		public btn_texttest:laya.display.Text;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/TestScene");
        }
    }
    REG("game.ui.test.TestSceneUI",TestSceneUI);
}
export module game.ui.UI {
    export class UIInGameUI extends View {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("UI/UIInGame");
        }
    }
    REG("game.ui.UI.UIInGameUI",UIInGameUI);
    export class UIMainUI extends View {
		public testimge:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("UI/UIMain");
        }
    }
    REG("game.ui.UI.UIMainUI",UIMainUI);
}