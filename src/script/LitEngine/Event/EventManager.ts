export module LEvent {
    export class EventManager {
        protected static _instance: EventManager = null;
        public static get Instance() {
            if (EventManager._instance == null)
                EventManager._instance = new EventManager();
            return EventManager._instance;
        }

        protected constructor() {

        }

        protected eventHandles: EventGroup[] = [];

        public static RegEvent(eventKey: string, callBack: Laya.Handler) {
            if (EventManager.Instance.eventHandles[eventKey] == null)
                EventManager.Instance.eventHandles[eventKey] = new EventGroup(eventKey);
            EventManager.Instance.eventHandles[eventKey].Add(callBack);
        }

        public static UnRegEvent(eventKey: string, callBack: Laya.Handler) {
            if (EventManager.Instance.eventHandles[eventKey] == null) return;
            EventManager.Instance.eventHandles[eventKey].Remove(callBack);
        }

        public static DispatchEvent(eventKey: string, data: {}) {
            if (EventManager.Instance.eventHandles[eventKey] == null) return;
            EventManager.Instance.eventHandles[eventKey].DispatchEvent(data);
        }
    }

    export class EventGroup {
        public readonly EventKey: string;
        protected _calls: Laya.Handler[] = [];
        constructor(key: string) {
            this.EventKey = key;
        }

        public Add(callBack: Laya.Handler) {
            let tindex = this._calls.indexOf(callBack);
            if (tindex !== -1) return;
            this._calls.push(callBack);
        }

        public Remove(callBack: Laya.Handler) {
            let tindex = this._calls.indexOf(callBack);
            if (tindex !== -1)
                this._calls.splice(tindex, 1);
        }

        public DispatchEvent(data: {}) {
            for (let i = 0; i < this._calls.length; i++) {
                let element = this._calls[i];
                element.runWith(data);
            }
        }
    }
}
