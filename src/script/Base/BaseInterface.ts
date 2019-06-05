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

interface InitCallBack{
    Init(fun: Laya.Handler) ;
}

interface IRest{
    Rest();
}

interface ICustomArray<T>{
    [index:number]:T;
}
