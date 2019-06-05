export module State {
    export enum StateType {
        none = 0,
        onEnter,
        onExit,
        Loaded,
    }
    export abstract class StateBase implements IUpdate {
        public readonly name: string;
        protected _state: StateType = StateType.none;
        protected _module: GameModuleBase;
        public get CurModule(): GameModuleBase  {
            return this._module;
        }
        protected _onLoaded: Laya.Handler;
        public get State() {
            return this._state;
        }
        constructor(nstr: string) {
            this.name = nstr;
        }
        public OnEnter(fun: Laya.Handler, pData?: any) {
            this._state = StateType.onEnter;
            this._onLoaded = fun;
        }

        public OnExit() {
            var tmodule = this._module;
            if (tmodule != null)
                tmodule.Destroy();
            this._state = StateType.onExit;
        }

        protected OnLoaded() {
            this._state = StateType.Loaded;
            if (this._onLoaded != null)
                this._onLoaded.run();
        }

        public Update(dt: number) {
            var tmodule = this._module;
            if (tmodule != null)
                tmodule.Update(dt);
        }

        public UpdateData() {
            var tmodule = this._module;
            if (tmodule != null)
                tmodule.UpdateData();
        }
    }
}
