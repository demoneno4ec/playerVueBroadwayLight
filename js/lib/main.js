class BroadwayPlayer {
    constructor(url, pathDecoder) {
        this.url = url;
        this.player = new Player({
            useWorker: true,
            workerFile: pathDecoder,
            webgl: false
        });


        this.toUint8Array = function(parStr){
            let raw = window.atob(parStr),
                rawLength = raw.length,
                array = new Uint8Array(new ArrayBuffer(rawLength));

            let i;
            for (i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        };
    }

    httpGetData(url, callback, type) {

        let xmlHttp = new XMLHttpRequest(),
            broadwayPlayer = this;
        xmlHttp.open("GET", url, true);
        xmlHttp.responseType = type;
        xmlHttp.onload = function (e) {
            callback(e.target.response, broadwayPlayer);
        };
        xmlHttp.send(null);
    }

    decode(data, broadwayPlayer) {
        if (data.length === 0 && broadwayPlayer instanceof BroadwayPlayer) {
            return;
        }

        let bin = broadwayPlayer.toUint8Array(data);
        broadwayPlayer.player.decode(bin);
    }

    update() {

        this.httpGetData(this.url, this.decode, 'text');
    }

    getFrame() {

        let currentObject = this;
        $(function() {
            document.getElementsByClassName('js-stream-canvas-box')[0]
                .appendChild(currentObject.player.canvas);
        });
    }
}

