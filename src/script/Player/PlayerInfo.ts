export module Player{
    
    export class PlayerBase{
        protected _key:string;
        protected _data:any;
        public get data(){
            return this._data;
        }
        public Save()
        {
            PlayerData.SetItem(this._key,this._data);
        }
    
        public Load()
        {
            var tdata = PlayerData.GetItem(this._key);
            if(tdata != null)
                this._data = tdata;
        }
    }
    
    export class PlayerInfo extends PlayerBase
    {
        private static _info:PlayerInfo;
        public static get Info()
        {
            if(PlayerInfo._info == null)
            {
                PlayerInfo._info = new PlayerInfo();
            }
            return PlayerInfo._info;
        }

        constructor()
        {
            super();
            this._key = "PlayerInfo";
            this._data = {
                playerName : "",
                gold : 0,
                usedId:"10001",
            };
            this.Load();
        }   
    }

    export class PlayerData {
        private constructor() {
    
        }
    
        public static SetItem(key: string, userData: any) {
            Laya.LocalStorage.setItem(key, PlayerData.Encrypt(JSON.stringify(userData)));
        }
    
        public static GetItem(key: string) {
            var titem = Laya.LocalStorage.getItem(key);
            if (titem != null)
                return JSON.parse(PlayerData.Encrypt(titem));
            else
                return null;
        }
    
        public static RemoveItem(key: string) {
            Laya.LocalStorage.removeItem(key);
        }
    
        public static encryption: Number[] = [2, 3, 6, 9, 4, 7, 4, 5, 8, , 2, 5, 6, 8];     //密钥
        public static Encrypt(sor) {
            var arr = sor.split('');
            let index = 0;
            var result = arr.map(function (item) {
                var newItem = PlayerData.xor(item, index);
                index++;
                if (index >= PlayerData.encryption.length)
                    index = 0;
                return newItem;
            });
            return result.join('');
        }
    
        public static xor(msg, index) {
            var ecnumber: any = PlayerData.encryption[index];
            var num10 = msg.charCodeAt();
            var numXOR = num10 ^ ecnumber;
            return String.fromCharCode(numXOR);
        }
    }
}