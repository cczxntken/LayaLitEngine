
import EventManager from "./Event/EventManager";
import HttpNet from "./Net/HttpNet";
import WebSocketNet from "./Net/WebSocketNet";
import { Log } from "./Dlog";
import { Pool } from "./Pool/NodePool";
import { Asset } from "./Asset/AssetLoader";

export module LE{
    export class AssetLoader extends Asset.AssetLoader {

    }
    export class Event extends EventManager {

    }

    export class DLog extends Log.DLog {

    }

    export class NodePool extends Pool.NodePool {

    }
}