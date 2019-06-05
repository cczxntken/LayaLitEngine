import GameConfig from "./GameConfig";
import GameCore from "./script/GameCore"
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		GameConfig.height = 0;//调用默认生成的脚本方法
		if (window["Laya3D"]) Laya3D.init(GameCore.width, GameCore.height);
		else Laya.init(GameCore.width, GameCore.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameCore.scaleMode;
		Laya.stage.screenMode = GameCore.screenMode;
		Laya.stage.alignH = GameCore.alignH;
		Laya.stage.alignV = GameCore.alignV;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameCore.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameCore.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameCore.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameCore.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		GameCore.Init();
	}
}
//激活启动类
new Main();
