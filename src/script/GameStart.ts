import GameCore from "./GameCore";
import MainState from "./State/MainState";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameStart extends Laya.Scene {
    public testScene_btn: Laya.Button;
    public btn_texttest: Laya.Text;

    public owner3d;
    constructor() {
        super();
    }

    createChildren(): void {
        super.createChildren();
        this.loadScene("GameStart");
    }

    onAwake(){
   //Laya.Scene3D.load("testscene/level1.ls",Laya.Handler.create(this,this.onComplete));

        //添加3D场景

        
        // var tscene: Laya.Scene3D = this.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        // this.owner3d = tscene;

        // var camera:Laya.Camera = (tscene.addChild(new Laya.Camera( 0, 0.1, 100))) as Laya.Camera;
        //     camera.transform.translate(new Laya.Vector3(1, 6, 10));
        //     camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
        //     camera.clearColor = null;
           


        //     var directionLight:Laya.DirectionLight = tscene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //     directionLight.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
        //     directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
        //     //添加自定义模型
        //     var sphere:Laya.MeshSprite3D = tscene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1,100,100))) as Laya.MeshSprite3D;
        //     sphere.transform.rotate(new Laya.Vector3(0,90,0),false,false);
        //     sphere.transform.translate(new Laya.Vector3(0,3,0));
        //     sphere.meshRenderer.material = new Laya.BlinnPhongMaterial;
        //     var material:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        //     Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
        //         material.albedoTexture = tex;
        //     }));
        //     sphere.meshRenderer.material = material;
        //     //添加物理组件
        //     sphere.addComponent(Laya.PhysicsCollider);
        //     //给球添加刚体
        //     var rigid:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
        //     //有刚体的shape要加在刚体上
        //     rigid.colliderShape = new Laya.SphereColliderShape(1);
        //     //添加一个地板
        //     var floor:Laya.MeshSprite3D = tscene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10,10))) as Laya.MeshSprite3D;
        //     //给地板添加物理组件
        //     var floorCollicar:Laya.PhysicsCollider = floor.addComponent(Laya.PhysicsCollider);
        //     // 添加collidershape
        //     floorCollicar.colliderShape = new Laya.BoxColliderShape(10,0,10);
        //     //克隆一个球                
        //     Laya.timer.once(1000,this,function():void{
        //       //一秒之后复制一个球
        //          var cloneSphere:Laya.MeshSprite3D = Laya.Sprite3D.instantiate(sphere) as Laya.MeshSprite3D;
        //         //设置位置偏移
        //          cloneSphere.transform.translate(new Laya.Vector3(1,4,0));
        //         //添加到场景
        //         tscene.addChild(cloneSphere);
        //     });

        Laya.Scene3D.load('testscene/level1.ls', Laya.Handler.create(this, this.onComplete));

        console.log(this.btn_texttest);
        console.log(this.testScene_btn);
        // var testcount = 0;
        // this.testScene_btn.on(laya.events.Event.CLICK, this, function () { this.btn_texttest.text = String(testcount); testcount++; });
       // GameCore.Core.mgrState.GotoState(new MainState());
        // GameCore.mgrUI.ShowUI("UIMain",function(sui){
        //     console.log(sui);
        // });
        // Laya.Scene.load("prefab/testimage.prefab",Laya.Handler.create(this,function(res){
        //     this.addChild(res);
        // }));
    }

    private onComplete(sceneres: Laya.Scene3D): void {
        // 将场景加到舞台上
        GameCore.Core.layerScene.addChild(sceneres);
       // this.addChildAt(sceneres,0);
        //     //添加自定义模型
        var sphere: Laya.MeshSprite3D =  sceneres.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1, 100, 100))) as Laya.MeshSprite3D;
        sphere.transform.rotate(new Laya.Vector3(0, 90, 0), false, false);
        sphere.transform.translate(new Laya.Vector3(0, 3, 0));
        sphere.meshRenderer.material = new Laya.BlinnPhongMaterial;
        var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D): void {
            material.albedoTexture = tex;
        }));
        sphere.meshRenderer.material = material;
        //添加物理组件
        sphere.addComponent(Laya.PhysicsCollider);
        //给球添加刚体
        var rigid: Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
        rigid.colliderShape = new Laya.SphereColliderShape(1);

       // this.removeSelf();
    }
}