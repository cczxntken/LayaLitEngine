
import { Log } from "./Dlog";
import { Pool } from "./Pool/NodePool";
import { Asset } from "./Asset/AssetLoader";
import { LEvent } from "./Event/EventManager";
import { Audio } from "./Audio/AudioManager";
import { LENet } from "./Net/HttpNet";
import { LESocket } from "./Net/WebSocketNet";

export module LE{
    export class AssetLoader extends Asset.AssetLoader {}
    export class EventManager extends LEvent.EventManager {}
    export class DLog extends Log.DLog {}
    export class NodePool extends Pool.NodePool {}
    export class AudioManager extends Audio.AudioManager{}
    export class HttpNet extends LENet.HttpNet{}
    export class WebSocketNet extends LESocket.WebSocketNet{}
}