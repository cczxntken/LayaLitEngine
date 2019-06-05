
export module GameDefine{
    export class EventKey
    {
        static readonly none = "none";
        static readonly moduleCall = "InGameModule";
    }

    export enum ModuleEvent
    {
        none = 0,
        goNextGroup,
        pathEnd,
    }

    export enum Layer{
        default = 0,
        player,
        npc,
        mapItem,
        wall,
    }

    export enum ColGroup{
        default = 0x01,
        player = 0x02,
        npc = 0x04,
        mapItem = 0x08,
        wall = 0x10,
    }
}