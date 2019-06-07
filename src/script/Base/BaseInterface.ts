interface IDispose{
    Destroy();
}

interface IUpdate{
    Update(dt:number);
    UpdateData();
}

interface IRuning{
    Run();
    Pause();
    Resume();
}

interface IRest{
    Rest();
}

interface IInit{
    Init();
}

interface IInitAsync{
    Init(pComplete?:Laya.Handler);
}
