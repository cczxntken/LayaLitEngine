interface GameModuleBase extends IDispose, IUpdate, IRuning ,IInitAsync{
    GetScene();
    ModuleEvent(args);
}