interface GameModuleBase extends IDispose, IUpdate, IRuning, InitCallBack {
    GetScene();
    ModuleEvent(args);
}