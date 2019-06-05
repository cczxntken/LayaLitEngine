import { GameDefine } from "../GameDefine";

export module Tool{
    export class Helper{
        public static SetCollisionGroup(pNode:Laya.Node, pColGroup:GameDefine.ColGroup){
           // PhysicsComponent
           let tcmp : Laya.PhysicsComponent = pNode.getComponent(Laya.PhysicsComponent);
           if(tcmp != null){
               tcmp.collisionGroup = pColGroup;
           }
           let tcount = pNode.numChildren;
            if (tcount > 0)  {
                for (let i = 0; i < tcount; i++) {
                    const e = pNode.getChildAt(i);
                    Helper.SetCollisionGroup(e,pColGroup);
                }
            }
        }

        public static SetLayer(pNode:Laya.Node, pLayer:GameDefine.Layer,pDeep:boolean = true){
            if(!(pNode instanceof Laya.Sprite3D)) return;
            pNode.layer = pLayer;
            if(!pDeep) return;
            let tcount = pNode.numChildren;
             if (tcount > 0)  {
                 for (let i = 0; i < tcount; i++) {
                     const e = pNode.getChildAt(i);
                     Helper.SetLayer(e,pLayer);
                 }
             }
         }
    }
}