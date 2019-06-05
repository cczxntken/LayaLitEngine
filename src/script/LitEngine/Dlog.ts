export module Log {
    export enum LogColor {
        NONE = 0,
        BLUE,
        YELLO,
        RED,
        GREEN,
        AQUA,
        WHITE,
    }
    export enum DLogType {
        Log = 1,
        Warning,
        Error,
        Assert,
        TrueLog,
    }
    export class DLog {
        public static MinLogType: DLogType = DLogType.Log;
        private static IsShow(pType: DLogType): boolean  {
            let ret = pType - DLog.MinLogType;
            if (ret < 0) return false;
            return true;
        }
        protected static ColorString(_color: LogColor): string  {
            let ret: string;
            switch (_color)  {
                case LogColor.BLUE:
                    ret = "<color=blue>";
                    break;
                case LogColor.YELLO:
                    ret = "<color=yellow>";
                    break;
                case LogColor.RED:
                    ret = "<color=red>";
                    break;
                case LogColor.GREEN:
                    ret = "<color=green>";
                    break;
                case LogColor.AQUA:
                    ret = "<color=aqua>";
                    break;
                case LogColor.WHITE:
                    ret = "<color=white>";
                    break;
            }
            return ret;
        }

        public static LOGColor(pType: DLogType, pMsg: string, pColor: LogColor)  {
            if (!DLog.IsShow(pType)) return;

            switch (pType) {
                case DLogType.TrueLog:
                case DLogType.Log:
                    console.log(pMsg);
                    break;
                case DLogType.Error:
                    console.error(pMsg);
                    break;
                case DLogType.Warning:
                    console.warn(pMsg);

                    break;
                case DLogType.Assert:
                    console.assert(false, pMsg);
                    break;
                default:
                    break;
            }
        }
        public static Log(pObject)  {
            if (!DLog.IsShow(DLogType.Log)) return;
            DLog.LOGColor(DLogType.Log, pObject, LogColor.NONE);
        }

        public static LogWarning(pObject)  {
            if (!DLog.IsShow(DLogType.Warning)) return;
            DLog.LOGColor(DLogType.Warning, pObject, LogColor.NONE);
        }

        public static LogError(pObject)  {
            if (!DLog.IsShow(DLogType.Error)) return;
            DLog.LOGColor(DLogType.Error, pObject, LogColor.NONE);
        }

        public static LogAssertion(pObject)  {
            if (!DLog.IsShow(DLogType.Assert)) return;
            DLog.LOGColor(DLogType.Assert, pObject, LogColor.NONE);
        }
    }
}
