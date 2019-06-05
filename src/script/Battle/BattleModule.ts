export module Battle {
    export enum DamageType {
        none = 0,
        physicla,
    }
    export class BattleData implements IRest{
        public readonly attackPower: number = 0;
        public readonly type: DamageType = 0;
        public readonly defenes: number = 0;
        public readonly hp: number = 0;
        public curHp = 0;
        constructor(pData: any) {
            if (pData == null) return;
            this.attackPower = pData.attackPower;
            this.type = pData.attackType;
            this.hp = pData.hp;
            this.defenes = pData.defenes;

            this.curHp = this.hp;
        }
        
        public Rest(){
            this.curHp = this.hp;
        }
    }
}