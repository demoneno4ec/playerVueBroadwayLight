<template>
    <div>
        <streamCanvas>
        </streamCanvas>
    </div>
</template>

<script>
    import streamCanvas from './streamCanvas.vue';
    import {eventBus} from '../../functions/eventBus';
    import {httpGetData} from "../../functions/httpGetData";
    import {toUint8Array} from "../../functions/toUint8Array";

    export default {
        name: "stream",
        components: {
            streamCanvas
        },
        props: {
            url: {
                type: String,
                default: '',
                required: true
            },
            worker: {
                type: Object,
                default: '',
                required: true
            }
        },
        data() {
            return {
                render: true,
                intervalPlay: 0,
                interval: 50,
                play: false,
            }
        },
        methods: {
            decode(data) {
                if (data.length === 0) {
                    return;
                }
                let bin = toUint8Array(data);
                this.decodePlayer(bin);
            },
            decodePlayer(parData) {
                let parDataLength = parData.length,
                    copyU8 = new Uint8Array(parDataLength),
                    copyU8Buffer = copyU8.buffer;
                copyU8.set(parData, 0);

                this.worker.postMessage({
                    type: "Broadway.js - Worker init",
                    options: {
                        rgb: true,
                        reuseMemory: false
                    }
                });

                this.worker.postMessage({
                    buf: copyU8Buffer,
                    offset: 0,
                    length: parDataLength,
                }, [copyU8Buffer]); // Send data to our worker.
            },
            onPictureDecoded(buffer, width, height) {
                if (!buffer || this.render === false) {
                    return;
                }

                let options = {
                    data: buffer,
                    width: width,
                    height: height
                };

                eventBus.$emit('renderFrame', options);
            },
            updateFrame() {
                httpGetData(
                    this.url,
                    {},
                    response => {
                        if (response.status === 200) {
                            this.decode(response.data)
                        }
                    },
                    error => {
                        console.group('Сервер с картинкой не отвечает.');
                        console.log(error);
                        console.groupEnd();
                    }
                );
            },
            playVideo() {
                if (this.play === false) {
                    this.play = true;
                    this.intervalPlay = setInterval(this.updateFrame, this.interval);
                }
            },
            pauseVideo() {
                if (this.play === true) {
                    if (this.intervalPlay) {
                        clearInterval(this.intervalPlay);
                    }
                    this.play = false;
                }
            },
        },
        mounted() {
            this.worker.onmessage = (e) => {
                let data = e.data;
                if (data.consoleLog) {
                    console.log(data.consoleLog);
                    return;
                }

                this.onPictureDecoded(
                    new Uint8Array(data.buf, 0, data.length),
                    data.width,
                    data.height,
                );
            };

            this.updateFrame();

            eventBus.$on('PlayVideo', () => {
                this.playVideo();
            });
            eventBus.$on('PauseVideo', () => {
                this.pauseVideo();
            });
        }
    }
</script>