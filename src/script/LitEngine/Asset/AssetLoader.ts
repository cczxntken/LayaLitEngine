 export module Asset{
    export class AssetLoader {
        private _assets: any[] = []
        constructor() {
    
        }

        public static Load(url: any, complete?:Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean) {
            Laya.loader.load(url, Laya.Handler.create(this, function(event){
                if(complete != null){
                    complete.runWith(event);
                }
            }),progress,type,priority,cache, group,ignoreCache,useWorkerLoader);
        }

        public static Creat(url: any, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, constructParams?: Array<any>, propertyParams?: any, priority?: number, cache?: boolean) {
            Laya.loader.create(url, Laya.Handler.create(this, function(event){
                if(complete != null){
                    complete.runWith(event);
                }
            }),progress,type,constructParams,propertyParams, priority,cache);
        }
    }
}
