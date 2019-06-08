export module LENet {
    export class HttpNet {
        constructor() {

        }

        private static SendCallBack(url: string, completeCall: (erro: string, response: string) => void) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    let err: string = null;
                    if (xhr.status >= 400) {
                        err = `请求数据发生错误.readyState = ${xhr.readyState}, status = ${xhr.status}`;
                    }
                    if (completeCall != null)
                        completeCall(err, xhr.responseText);
                }
            };


            xhr.onerror = function () {
                if (completeCall != null)
                    completeCall(`请求数据发生错误.readyState = ${xhr.readyState}, status = ${xhr.status}`, null);
            };
            xhr.ontimeout = function () {
                if (completeCall != null)
                    completeCall(`请求数据超时.readyState = ${xhr.readyState}, status = ${xhr.status}`, null);
            };
            xhr.onabort = function () {
                if (completeCall != null)
                    completeCall(`请求数据超时.readyState = ${xhr.readyState}, status = ${xhr.status}`, null);
            };

            xhr.open("GET", url, true);
            xhr.timeout = 10000;
            xhr.send();

        }

        public static async Send(url: string, completeCall: (erro: string, response: string) => void = null) {
            if (completeCall != null) {
                HttpNet.SendCallBack(url, function (erro: string, response: string) {
                    if (erro)
                        console.error(erro);
                    completeCall(erro, response);
                });
            }
        }
    }
}
