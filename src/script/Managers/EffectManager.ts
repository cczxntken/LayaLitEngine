
import { Pool } from "../LitEngine/Pool/NodePool";
import GameCore from "../GameCore";
import { Managers } from "./BaseManager";

export default class EffectManager extends Managers.BaseManager {
    public static Creat(): EffectManager {
        return new EffectManager();
    }

    public Init() {

    }

    private _pool: Pool.NodePool;
    private _LifeList: Laya.ShuriKenParticle3D[] = [];
    private _sceneNode: Laya.Sprite3D;
    private constructor() {
        super(null, "EffectManager");
        this._pool = new Pool.NodePool();
        this._pool.SetCreater(function (url) {
            let ret = Laya.Loader.getRes(url);
            if (ret == null) return;

            if (ret instanceof Laya.ShuriKenParticle3D) {
                ret = ret.clone();
                ret.name = url;
                return ret;
            }else{
                console.error("无法获取 ShuriKenParticle3D");
                return null;
            }

        });
        this._pool.SetDestroyer(function (obj) {
            obj.destroy();
        });
    }

    public SetSceneNode(pScene: Laya.Sprite3D)  {
        this._sceneNode = pScene;
    }

    public Clear()  {
        let n = this;
        n._sceneNode = null;
        n._pool.Clear();

        let tlist = n._LifeList;
        for (let i = 0; i < tlist.length; i++) {
            const e = tlist[i];
            e.destroy();
        }
        n._LifeList = [];
    }

    public Play(url: string, pTargetNode: Laya.Sprite3D)  {
        if (this._sceneNode == null) return;
        if(url.length == 0) return;
        let n = this;
        let tres = n._pool.Get(url) as Laya.ShuriKenParticle3D;
        if (tres == null) return;
        n._sceneNode.addChild(tres);
        tres.transform.position = pTargetNode.transform.position;
        tres.particleSystem.play();
        n._LifeList.push(tres);
    }

    public Update(dt: number)  {
        let n = this;
        let tlist = n._LifeList;
        for (let i = tlist.length - 1; i >= 0; i--) {
            const e = tlist[i];
            if(!e.particleSystem.isPlaying){
                tlist.splice(i,1);
                e.removeSelf();
                n._pool.Push(e.name,e);
            }
           
        }
    }
}