<template>
    <div>
        <streamCanvas>
        </streamCanvas>
    </div>
</template>

<script>
    import axios from 'axios';
    import streamCanvas from './streamCanvas.vue';
    import {eventBus} from './eventBus';

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
            }
        },
        methods: {
            httpGetData() {
                axios
                    .get(this.url, {})
                    .then(response => {
                        if (response.status === 200) {
                            this.decode(response.data)
                        }
                    })
                    .catch(error => {
                        console.group('Сервер с картинкой не отвечает.');
                        console.log(error);
                        console.groupEnd();
                    });
            },
            decode(data) {
                if (data.length === 0) {
                    return;
                }
                let bin = this.toUint8Array(data);
                this.decodePlayer(bin);
            },
            toUint8Array(parStr) {
                let raw = window.atob(parStr),
                    rawLength = raw.length,
                    array = new Uint8Array(new ArrayBuffer(rawLength));

                for (let i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                }

                return array;
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

            this.httpGetData();
        }
    }
</script>